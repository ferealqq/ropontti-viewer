import React, { useEffect, useRef } from "react";

const api = process.env.REACT_API_URL || "http://localhost:8080/stream";

export default function Stream({ startTime = 0, roponttiNumber }) {
  const url = `${api}/${roponttiNumber}`;
  const video = useRef(null);

  useEffect(() => {
    video.current.src = url;
    video.current.play().then(() => {
      video.current.currentTime = startTime;
    });
  }, []);

  return (
    <video
      controls={true}
      muted={true}
      autoPlay={true}
      playsInline={true}
      ref={video}
    ></video>
  );
}
