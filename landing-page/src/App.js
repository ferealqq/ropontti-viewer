import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
import trackData from "./testi_route.json";
import { useEffect, useRef } from "react";
import Modal from "./components/Modal";

export default function App() {
  const [activePark, setActivePark] = useState(null);
  const [point, setPoint] = useState(1);
  const intervalRef = useRef(0);

  useEffect(() => {
    setInterval(() => {
      if (intervalRef.current >= trackData.features.length - 1)
        intervalRef.current = 0;
      setPoint(intervalRef.current + 1);
      intervalRef.current += 1;
    }, 1000);
  }, []);

  return (
    <MapContainer
      center={[
        trackData.features[point].geometry.coordinates[1],
        trackData.features[point].geometry.coordinates[0],
      ]}
      zoom={30}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        key={"park.properties.PARK_ID"}
        position={[
          trackData.features[point].geometry.coordinates[1],
          trackData.features[point].geometry.coordinates[0],
        ]}
        onClick={() => {
          setActivePark("park");
        }}
      />
    </MapContainer>
  );
}
