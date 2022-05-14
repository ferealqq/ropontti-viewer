import React, { useState, useEffect, useContext, createContext } from "react";
import { roponttiContext } from "../App";

import { Button } from "@mui/material";
import List from "@mui/material/List";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import Stream from "../Stream";
import Item from "./Item";
import _ from "lodash";

const Modal = (props) => {
  const {
    chosenOne,
    order1,
    destination1,
    name1,
    song1,
    time1,
    order2,
    destination2,
    name2,
    song2,
    time2,
    order3,
    destination3,
    name3,
    song3,
    time3,
  } = useContext(roponttiContext);
  const [order, setOrder] = useState(order1);
  const [destination, setDestination] = useState(destination1);
  const [name, setName] = useState(name1);
  const [song, setSong] = useState(song1);
  const [time, setTime] = useState(time1);
  useEffect(() => {
    if (chosenOne === 1) {
      setOrder(order1);
      setDestination(destination1);
      setName(name1);
      setSong(song1);
      setTime(time1);
    } else if (chosenOne === 2) {
      setOrder(order2);
      setDestination(destination2);
      setName(name2);
      setSong(song2);
      setTime(time2);
    } else {
      setOrder(order3);
      setDestination(destination3);
      setName(name3);
      setSong(song3);
      setTime(time3);
    }
  }, [chosenOne]);
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ width: "100%" }}
    >
      <Grid item>
        <Stream startTime={time} />
        <Item item={`Nimi: ${name}`} />
        <Divider />
        <Item item={`Osoite: ${destination}`} />
        <Divider />
        <Item item={`Biisi: ${song}`} />
        <Divider />
        <Item item={`Tilaus:`} />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {order.map((item) => {
            // console.log(item);
            return <Item item={item} avatar={true} />;
          })}
        </List>
        <Button
          style={{ margin: 10 }}
          onClick={() => props.backButtonPress()}
          variant="outlined"
        >
          Takaisin
        </Button>
      </Grid>
    </Grid>
  );
};

export default Modal;
