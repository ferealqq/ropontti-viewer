import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
import trackData from "./testi_route.json";
import { useEffect, useRef } from "react";

const parkData = {
  features: [
    {
      type: "Feature",
      properties: {
        PARK_ID: 960,
        NAME: "Bearbrook Skateboard Park",
        DESCRIPTIO: "Flat asphalt surface, 5 components",
      },
      geometry: {
        type: "Point",
        coordinates: [-75.3372987731628, 45.383321536272049],
      },
    },
    {
      type: "Feature",
      properties: {
        PARK_ID: 1219,
        NAME: "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
        DESCRIPTIO:
          "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer",
      },
      geometry: {
        type: "Point",
        coordinates: [-75.546518086577947, 45.467134581917357],
      },
    },
  ],
};

export default function App() {
  const [activePark, setActivePark] = useState(null);
  const [point, setPoint] = useState(1);
  const intervalRef = useRef(0);

  useEffect(() => {
    setInterval(() => {
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
