export default function Stream({ startTime = 0 }) {
  return (
    <video
      style={{ objectFit: "cover", width: "100%" }}
      controls={false}
      muted={true}
      autoPlay={true}
      playsInline={true}
    >
      <source
        src={`http://localhost:8080/video#t=${startTime}`}
        type="video/mp4"
      ></source>
    </video>
  );
}
