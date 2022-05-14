import React, { useState, useEffect, useRef } from "react";

export default function Stream({ startTime = 0 }) {
  const url = `http://localhost:8080/video`;
  const video = useRef(null);
  const mediaSource = new MediaSource();
  const [souc, setSouc] = useState(null);
  function sourceOpen() {
    URL.revokeObjectURL(souc);
    const sourceBuffer = mediaSource.addSourceBuffer(
      'video/webm; codecs="vp09.00.10.08"'
    );
    console.log("yes this is source open");
    // If video is preloaded already, fetch will return immediately a response
    // from the browser cache (memory cache). Otherwise, it will perform a
    // regular network fetch.
    fetch(url, { mode: "no-cors" })
      .then((response) => response.arrayBuffer())
      .then((data) => {
        // Append the data into the new sourceBuffer.
        console.log("yes append data");
        sourceBuffer.appendBuffer(data);
        // TODO: Fetch file_2.webm when user starts playing video.
      })
      .catch((error) => {
        // TODO: Show "Video is not available" message to user.
      });
  }

  mediaSource.addEventListener("onsourceopen", sourceOpen, { once: true });
  mediaSource.addEventListener("sourceopen", sourceOpen, { once: true });

  useEffect(() => {
    setSouc(URL.createObjectURL(mediaSource));
    video.current.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("onsourceopen", sourceOpen, { once: true });
    mediaSource.addEventListener("sourceopen", sourceOpen, { once: true });
    console.log("yes use effect");
    console.log(video);
  }, [startTime]);
  // console.log(mediaSource);
  // console.log("souc => ", souc);

  return (
    <video
      controls={false}
      muted={true}
      autoPlay={true}
      playsInline={true}
      ref={video}
      src={souc}
    >
      {/* <source
        id="video"
        src={souc}
        // src={`http://localhost:8080/video#t=${startTime}`}
        onLoadedMetadata={(elem) => {
          console.log(this);
          console.log("elem => ", elem);
        }}
      ></source> */}
    </video>
  );
}
