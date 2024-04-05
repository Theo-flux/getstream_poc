import { createLazyFileRoute } from "@tanstack/react-router";
import { Meeting } from "../pages";
import { CallingState, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { SyncLoader } from "react-spinners";

const Join = () => {
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  call?.join();

  return (
    <div className="w-[100vw]">
      {callingState !== CallingState.JOINED ? (
        <div className="flex justify-center items-center">
          <SyncLoader color="#ffffff" size={10} />
        </div>
      ) : (
        <Meeting />
      )}
    </div>
  );
};

export const Route = createLazyFileRoute("/join")({
  component: () => <Join />,
});
