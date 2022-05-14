import React, { useState, Button, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
import trackData from "./route_points_all.json";
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
  const [chosenOne, setChosenOne] = useState(false);


  const [point1, setPoint1] = useState(1);
  const [point2, setPoint2] = useState(520);
  const [point3, setPoint3] = useState(1020);


  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(0);
  const [time3, setTime3] = useState(0);
  const intervalRef = useRef(0);

  const [order1, setOrder1] = useState(null);
  const [destination1, setDestination1] = useState(null);
  const [name1, setName1] = useState(null);
  const [song1, setSong1] = useState(null);

  const [order2, setOrder2] = useState(null);
  const [destination2, setDestination2] = useState(null);
  const [name2, setName2] = useState(null);
  const [song2, setSong2] = useState(null);

  const [order3, setOrder3] = useState(null);
  const [destination3, setDestination3] = useState(null);
  const [name3, setName3] = useState(null);
  const [song3, setSong3] = useState(null);


  useEffect(() => {
    setOrder1(
      lista.lista[Math.floor(Math.random() * Object.keys(lista.lista).length)]
    );
    setDestination1(
      osoite.osoite[
        Math.floor(Math.random() * Object.keys(osoite.osoite).length)
      ]
    );
    setName1(
      nimet.names[Math.floor(Math.random() * Object.keys(nimet.names).length)]
    );
    setSong1(
      songs.songs[Math.floor(Math.random() * Object.keys(songs.songs).length)]
    );
    setOrder2(
      lista.lista[Math.floor(Math.random() * Object.keys(lista.lista).length)]
    );
    setDestination2(
      osoite.osoite[
        Math.floor(Math.random() * Object.keys(osoite.osoite).length)
      ]
    );
    setName2(
      nimet.names[Math.floor(Math.random() * Object.keys(nimet.names).length)]
    );
    setSong2(
      songs.songs[Math.floor(Math.random() * Object.keys(songs.songs).length)]
    );
    setOrder3(
      lista.lista[Math.floor(Math.random() * Object.keys(lista.lista).length)]
    );
    setDestination3(
      osoite.osoite[
        Math.floor(Math.random() * Object.keys(osoite.osoite).length)
      ]
    );
    setName3(
      nimet.names[Math.floor(Math.random() * Object.keys(nimet.names).length)]
    );
    setSong3(
      songs.songs[Math.floor(Math.random() * Object.keys(songs.songs).length)]
    );
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (intervalRef.current >= trackData.features.length - 1)
        intervalRef.current = 0;

      setPoint1(intervalRef.current + 1);
      setPoint2(point2 < 1448 ? intervalRef.current + 520 : 0);
      setPoint3(point3 < 1448 ? intervalRef.current + 1020 : 0);
      intervalRef.current += 1;
      setTime1(intervalRef.current);
      setTime2(intervalRef.current + 520);
      setTime3(intervalRef.current + 1020);
    }, 1000);
  }, []);

  return (
    <roponttiContext.Provider value={{ order1, destination1, name1, song1, order2, destination2, name2, song2, order3, destination3, name3, song3, time1, time2, time3, chosenOne }}>
      <CssBaseline />
      <TemporaryDrawer drawerOpen={sideBarOpen} />
      <MapContainer
        center={[
          trackData.features[point1].geometry.coordinates[1],
          trackData.features[point1].geometry.coordinates[0],
        ]}
        zoom={30}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          key={"Ropontti1"}
          position={[
            trackData.features[point1].geometry.coordinates[1],
            trackData.features[point1].geometry.coordinates[0],
          ]}
          eventHandlers={{
            click: (e) => {
              setChosenOne(1);
              setSideBarOpen(!sideBarOpen);
            },
          }}
        ></Marker>
        <Marker
          key={"ropontti2"}
          position={[
            trackData.features[point2].geometry.coordinates[1],
            trackData.features[point2].geometry.coordinates[0],
          ]}
          eventHandlers={{
            click: (e) => {
              setChosenOne(2);
              setSideBarOpen(!sideBarOpen);
            },
          }}
        ></Marker>
        <Marker
          key={"ropontti3"}
          position={[
            trackData.features[point3].geometry.coordinates[1],
            trackData.features[point3].geometry.coordinates[0],
          ]}
          eventHandlers={{
            click: (e) => {
              setChosenOne(3);
              setSideBarOpen(!sideBarOpen);
            },
          }}
        ></Marker>
      </MapContainer>
    </roponttiContext.Provider>
  );
}
