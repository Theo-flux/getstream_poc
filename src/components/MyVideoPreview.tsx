import { VideoPreview, ToggleAudioPreviewButton, ToggleVideoPreviewButton } from "@stream-io/video-react-sdk";
import { useNavigate } from "@tanstack/react-router";
import "@stream-io/video-react-sdk/dist/css/styles.css";

export const MyVideoPreview = () => {
  const navigate = useNavigate()
  // const call = useCall();
  return (
    <div className="w-[100vw] flex flex-col space-y-4 justify-center items-center">
      <VideoPreview />
      <div className="flex justify-center items-center space-x-4">
        <ToggleAudioPreviewButton />
        <ToggleVideoPreviewButton />
        <button
          onClick={() => navigate({ to: "/join" })}
          className="flex justify-center items-center space-x-1 bg-green-500 text-white p-2 rounded-lg"
        >
          <p className="font-bold">Join meeting</p>
        </button>
      </div>
    </div>
  );
};
