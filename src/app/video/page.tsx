import AuthenticatedRoute from "../(auth)/authenticated-route";
import CustomWebcam from "./custom-webcam";

export default function VideoPage() {
  return (
    <AuthenticatedRoute>
      <div>
        <h1 className=" flex justify-center text-3xl font-semibold">Video</h1>
        <CustomWebcam
          height={1000}
          width={1000}
          imageSmoothing={true}
          mirrored={true}
        />
      </div>
    </AuthenticatedRoute>
  );
}
