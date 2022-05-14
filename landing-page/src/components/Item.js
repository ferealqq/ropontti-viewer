import * as React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const Item = ({ item, avatar }) => {
  return (
    <ListItem sx={{ width: "100%" }}>
      {avatar && (
        <ListItemAvatar>
          <Avatar>
            <ShoppingBagIcon />
          </Avatar>
        </ListItemAvatar>
      )}
      <ListItemText primary={item} />
    </ListItem>
  );
};

export default Item;
