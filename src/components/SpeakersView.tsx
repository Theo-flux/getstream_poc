import { useEffect, useState } from "react";
import {
  Comparator,
  ParticipantView,
  SfuModels,
  StreamVideoParticipant,
  VisibilityState,
  combineComparators,
  conditional,
  dominantSpeaker,
  pinned,
  publishingAudio,
  publishingVideo,
  reactionType,
  screenSharing,
  speaking,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const getCustomSortingPreset = (isOneToOneCall: boolean = false): Comparator<StreamVideoParticipant> => {
  // 1:1 calls are a special case, where we want to always show the other
  // participant in the spotlight, and not show them in the participants bar.
  if (isOneToOneCall) {
    return (a: StreamVideoParticipant, b: StreamVideoParticipant) => {
      if (a.isLocalParticipant) return 1;
      if (b.isLocalParticipant) return -1;
      return 0;
    };
  }

  // a comparator decorator which applies the decorated comparator only if the
  // participant is invisible.
  // This ensures stable sorting when all participants are visible.
  const ifInvisibleBy = conditional(
    (a: StreamVideoParticipant, b: StreamVideoParticipant) =>
      a.viewportVisibilityState?.videoTrack == VisibilityState.INVISIBLE ||
      b.viewportVisibilityState?.videoTrack == VisibilityState.INVISIBLE,
  );

  // the custom sorting preset
  return combineComparators(
    screenSharing,
    dominantSpeaker,
    pinned,
    ifInvisibleBy(speaking),
    ifInvisibleBy(reactionType("raised-hand")),
    ifInvisibleBy(publishingVideo),
    ifInvisibleBy(publishingAudio),
  );
};

export const SpeakerView = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const [participantInSpotlight, ...otherParticipants] = useParticipants();
  const [participantsBar, setParticipantsBar] = useState<HTMLDivElement | null>(null);

  // determine whether the call is a 1:1 call
  const isOneToOneCall = otherParticipants.length === 1;
  useEffect(() => {
    if (!call) return;
    const customSortingPreset = getCustomSortingPreset(isOneToOneCall);
    call.setSortParticipantsBy(customSortingPreset);
  }, [call, isOneToOneCall]);

  useEffect(() => {
    if (!participantsBar || !call) return;

    const cleanup = call.dynascaleManager.setViewport(participantsBar);

    return () => cleanup();
  }, [participantsBar, call]);

  return (
    <div className="w-[100vw]">
      {call && otherParticipants.length > 0 && (
        <div ref={setParticipantsBar} className="">
          {otherParticipants.map((participant) => (
            <div className="" key={participant.sessionId}>
              <ParticipantView className="w-[100vw] border border-white" participant={participant} />
            </div>
          ))}
        </div>
      )}

      <div className="w-[100vw]">
        {call && participantInSpotlight && (
          <ParticipantView
            className="w-[100vw] border border-white"
            participant={participantInSpotlight}
            trackType={hasScreenShare(participantInSpotlight) ? "screenShareTrack" : "videoTrack"}
          />
        )}
      </div>
    </div>
  );
};

// utility to determine whether the participant in spotlight is sharing their screen
const hasScreenShare = (p?: StreamVideoParticipant) => p?.publishedTracks.includes(SfuModels.TrackType.SCREEN_SHARE);
