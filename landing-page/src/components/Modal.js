import React, { useState, useEffect, useContext, createContext } from "react";
import { roponttiContext } from "../App";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import Stream from "../Stream";
import Item from "./Item";

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
            console.log(item);
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
