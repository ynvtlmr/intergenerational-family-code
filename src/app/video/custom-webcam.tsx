"use client";

import WebCam from "react-webcam";

type WebCamProps = {
  height: number;
  width: number;
  imageSmoothing: boolean;
  audio: boolean;
  mirrored: boolean;
};

export default function CustomWebcam({
  height,
  width,
  imageSmoothing,
}: WebCamProps) {
  return (
    <div className=" flex justify-center">
      <WebCam
        audio={true}
        height={height}
        width={width}
        imageSmoothing={imageSmoothing}
        mirrored={true}
      />
    </div>
  );
}
