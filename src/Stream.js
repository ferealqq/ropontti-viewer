import React, { useEffect, useRef, useContext, useState } from "react";
import { roponttiContext } from "./App";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Stream({ startTime = 0 }) {
  const video = useRef(null);
  const { chosenOne } = useContext(roponttiContext);
  const [loaded, setLoaded] = useState(false);
  const [newPageLoad, setNewPageLoad] = useState(false);
  const url = `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-${chosenOne}.mp4`;
  useEffect(() => {
    video.current.src = url;
    video.current.play().then(() => {
      video.current.currentTime = startTime;
    });
  }, []);

  // Load new page of a vide o
  if (video.current !== null && video.current.currentTime !== null) {
    const loadNewPage = (url) => {
      video.current.src = url;
      video.current
        .play()
        .then(() => {
          video.current.currentTime = 0;
        })
        .finally(() => {
          setNewPageLoad(true);
        });
    };
    if (chosenOne === 1 && video.current.currentTime > 515) {
      loadNewPage(
        `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-2.mp4`
      );
    } else if (chosenOne === 2 && video.current.currentTime > 545) {
      loadNewPage(
        `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-3.mp4`
      );
    } else if (chosenOne === 3 && video.current.currentTime > 484) {
      loadNewPage(
        `https://ropontti.s3.eu-central-1.amazonaws.com/Ropontti-1.mp4`
      );
    }
  }

  if (chosenOne > 3) return <p> Not found </p>;

  return (
    <>
      <Box
        style={{
          display: !loaded ? "flex" : "none",
          justifyContent: "center",
        }}
        className="stream-loader"
      >
        <CircularProgress style={{ margin: "auto" }} />
      </Box>
      <video
        style={{
          display: loaded ? "inherit" : "none",
        }}
        className="stream-video"
        controls={false}
        muted={true}
        autoPlay={true}
        playsInline={true}
        ref={video}
        onPlaying={() => {
          if (!loaded && video.current.currentTime >= startTime) {
            setLoaded(true);
          } else if (!loaded && newPageLoad) {
            setLoaded(true);
            setNewPageLoad(false);
          }
        }}
      ></video>
    </>
  );
}
