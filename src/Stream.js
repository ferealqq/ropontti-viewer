import React, { useEffect, useRef, useContext } from "react";
import { roponttiContext } from "./App";

const api = process.env.REACT_API_URL || "http://localhost:8080/stream";

export default function Stream({ startTime = 0 }) {
  const video = useRef(null);
  const { chosenOne } = useContext(roponttiContext);
  // const url = `${api}/${chosenOne}`;
  const url = `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-${chosenOne}.mp4`;
  useEffect(() => {
    video.current.src = url;
    video.current.play().then(() => {
      video.current.currentTime = startTime;
    });
  }, []);
  if(video.current !== null && video.current.currentTime !== null) {
    console.log(video.current.currentTime);
  if(chosenOne === 1 && video.current.currentTime > 515) {
    video.current.src = `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-2.mp4`;;
    video.current.play().then(() => {
      video.current.currentTime = 0;
    });
  } else if (chosenOne === 2 && video.current.currentTime > 545) {

    video.current.src = `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-3.mp4`;;
    video.current.play().then(() => {
      video.current.currentTime = 0;
    });
  } else if (chosenOne === 3 && video.current.currentTime > 484) {
    video.current.src = `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-1.mp4`;;
    video.current.play().then(() => {
      video.current.currentTime = 0;
    });
  }
}
  if (chosenOne > 3) return <p> Not found </p>;

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
