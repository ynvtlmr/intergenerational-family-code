import Video from "next-video";
// import getStarted from "../../videos/get-started.mp4.json";
import CustomWebcam from "./custom-webcam";

export default function VideoPage() {
  return (
    <div>
      <h1 className=" flex justify-center text-3xl font-semibold">Video</h1>
      <CustomWebcam
        height={1000}
        width={1000}
        imageSmoothing={true}
        audio={false}
        mirrored={true}
      />
      {/* <Video {...getStarted} /> */}
    </div>
  );
}
