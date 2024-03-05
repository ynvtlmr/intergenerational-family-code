"use client";

import { Button } from "@/components/ui/button";
import { useState, useCallback, useRef } from "react";
import WebCam from "react-webcam";

type WebCamProps = {
  height: number;
  width: number;
  imageSmoothing: boolean;
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
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
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
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    },
    [setRecordedChunks]
  );

  // start recording
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);

    const stream = webcamRef.current.stream;

    if (!stream) {
      console.log("No stream found.");
      return;
    }

    const options = { mimeType: "video/webm" };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorder.start();
  }, [handleDataAvailable, webcamRef]);

  // stop recording
  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  // download the video file
  const handleDownload = useCallback(() => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    // Set attributes and initiate download
    downloadLink.href = url;
    downloadLink.download = "react-webcam-stream-capture.webm";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Cleanup: remove the anchor tag and revoke blob URL
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // Reset the recordedChunks
    setRecordedChunks([]);
  }, [recordedChunks]);

  return (
    <div>
      <div className=" flex h-full flex-col items-center justify-between">
        {!openWebcam ? (
          <Button onClick={handleOpenWebcam} className="h-full">
            {" "}
            Open Webcam
          </Button>
        ) : (
          <>
            <div className=" flex-grow">
              <WebCam
                audio={true}
                mirrored={true}
                height={height}
                width={width}
                imageSmoothing={imageSmoothing}
                ref={webcamRef}
              />
            </div>

            <div className="p-5">
              <Button onClick={handleCloseWebcam}>Close Webcam</Button>
            </div>

            {capturing ? (
              <Button onClick={handleStopCaptureClick}>Stop Capture</Button>
            ) : (
              <Button onClick={handleStartCaptureClick}>Start Recording</Button>
            )}
            {recordedChunks.length > 0 && (
              <Button onClick={handleDownload}>Download</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
