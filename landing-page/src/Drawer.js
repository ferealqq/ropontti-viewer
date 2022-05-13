import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer({ drawerOpen }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  React.useEffect(() => {
    console.log("useeffect called");
    toggleDrawer("right", true);
  }, [drawerOpen]);

  const toggleDrawer = (anchor, open) => (event) => {
    // if (false && (event.key === "Tab" || event.key === "Shift")) {
    //   return;
    // }

    setState({ ...state, ["right"]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <p>test</p>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>{"right"}</Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
