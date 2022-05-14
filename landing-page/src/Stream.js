import React, { useEffect, useRef, useContext } from "react";
import { roponttiContext } from "./App";

const api = process.env.REACT_API_URL || "http://localhost:8080/stream";

export default function Stream({ startTime = 0 }) {
  const video = useRef(null);
  const { chosenOne } = useContext(roponttiContext);
  const url = `${api}/${chosenOne}`;

  useEffect(() => {
    video.current.src = url;
    video.current.play().then(() => {
      video.current.currentTime = startTime;
    });
  }, []);

  return (
    <video
      style={{ objectFit: "cover", width: "100%" }}
      controls={false}
      muted={true}
      autoPlay={true}
      playsInline={true}
      ref={video}
    ></video>
  );
}
