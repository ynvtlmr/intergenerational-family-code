import Video from "next-video";
// import getStarted from "../../videos/get-started.mp4.json";
import CustomWebcam from "./custom-webcam";

export default function VideoPage() {
  return (
    <div>
      <h1>Video</h1>
      <CustomWebcam
        height={1000}
        width={1000}
        imageSmoothing={true}
        audio={true}
        mirrored={true}
      />
      {/* <Video {...getStarted} /> */}
    </div>
  );
}
