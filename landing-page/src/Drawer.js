import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Modal from "./components/Modal";

export default function TemporaryDrawer({ drawerOpen, onClose }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  React.useEffect(() => {
    toggleDrawer("right", drawerOpen)();
  }, [drawerOpen]);

  const toggleDrawer = (anchor, open) => (event) => {
    // if (false && (event.key === "Tab" || event.key === "Shift")) {
    //   return;
    // }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Modal
        backButtonPress={() => {
          toggleDrawer(anchor, false)();
          onClose();
        }}
      />
    </Box>
  );

  return (
    <Drawer
      anchor={"right"}
      open={state["right"]}
      onClose={() => {
        toggleDrawer("right", false);
        onClose();
      }}
    >
      {list("right")}
    </Drawer>
  );
}
