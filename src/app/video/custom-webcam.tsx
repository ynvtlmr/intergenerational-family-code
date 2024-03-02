"use client";

import WebCam from "react-webcam";

type WebCamProps = {
  height: number;
  weight: number;
};

export default function CustomWebcam() {
  return (
    <div className=" flex justify-center">
      <WebCam />
    </div>
  );
}
