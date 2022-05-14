import React, { useState, useEffect, useContext, createContext } from "react";
import { roponttiContext } from "../App";
import Stream from "../Stream";

const Modal = (props) => {
  const { order, destination, name, song, setStream, time } =
    useContext(roponttiContext);

  const handleClick = () => {
    setStream(true);
  };
  if (
    order === null ||
    destination === null ||
    name === null ||
    song === null
  ) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      Nimi: {name} <br />
      Osoite: {destination} <br />
      Biisi: {song} <br />
      Tilaus:{" "}
      {order.map((item) => {
        return <div key={item}>{item}</div>;
      })}
      <Stream startTime={time} roponttiNumber={1} />
    </div>
  );
};

export default Modal;
