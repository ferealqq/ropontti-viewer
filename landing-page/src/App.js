import React, { useState, Button, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
import trackData from "./testi_route.json";
import { useEffect, useRef } from "react";
import SwipeableEdgeDrawer from "./Swipe";
import TemporaryDrawer from "./Drawer";
import lista from "./assets/kauppalistat.json";
import osoite from "./assets/osoitteet.json";
import nimet from "./assets/nimet.json";
import songs from "./assets/songs.json";
import { createContext } from "react";
import Stream from "./Stream";
import { Container, CssBaseline } from "@mui/material";

export const roponttiContext = createContext();

export default function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [activePark, setActivePark] = useState(null);
  const [point, setPoint] = useState(1);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(0);

  const [order, setOrder] = useState(null);
  const [destination, setDestination] = useState(null);
  const [name, setName] = useState(null);
  const [song, setSong] = useState(null);
  const [stream, setStream] = useState(false);

  useEffect(() => {
    setOrder(
      lista.lista[Math.floor(Math.random() * Object.keys(lista.lista).length)]
    );
    setDestination(
      osoite.osoite[
        Math.floor(Math.random() * Object.keys(osoite.osoite).length)
      ]
    );
    setName(
      nimet.names[Math.floor(Math.random() * Object.keys(nimet.names).length)]
    );
    setSong(
      songs.songs[Math.floor(Math.random() * Object.keys(songs.songs).length)]
    );
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (intervalRef.current >= trackData.features.length - 1)
        intervalRef.current = 0;
      setPoint(intervalRef.current + 1);
      intervalRef.current += 1;
      setTime(intervalRef.current);
    }, 1000);
  }, []);

  return (
    <roponttiContext.Provider value={{ order, destination, name, song, time }}>
      <CssBaseline />
      <TemporaryDrawer
        onClose={() => {
          setSideBarOpen(false);
        }}
        drawerOpen={sideBarOpen}
      />
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
          eventHandlers={{
            click: (e) => {
              setSideBarOpen(!sideBarOpen);
            },
          }}
        ></Marker>
      </MapContainer>
    </roponttiContext.Provider>
  );
}
