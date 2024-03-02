"use client";

import { useState, useCallback, useRef } from "react";
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
  // record a video
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [capturing, setCapturing] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);

  // open the webcam
  const handleOpenWebcam = useCallback(() => {
    setOpenWebcam(true);
  }, [setOpenWebcam]);

  // close the webcam
  const handleCloseWebcam = useCallback(() => {
    setOpenWebcam(false);
  }, [setOpenWebcam]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // start recording
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  // download the video file
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div className=" flex justify-center">
      {!openWebcam ? (
        <>
          <button onClick={handleOpenWebcam}>Open Webcam</button>
        </>
      ) : (
        <button onClick={handleCloseWebcam}>Close Webcam</button>
      )}

      {openWebcam && (
        <WebCam
          audio={true}
          mirrored={true}
          height={height}
          width={width}
          imageSmoothing={imageSmoothing}
          ref={webcamRef}
        />
      )}

      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </div>
  );
}
