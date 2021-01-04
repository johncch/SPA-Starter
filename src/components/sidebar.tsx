import * as React from "react";

import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Button,
  List,
  Divider,
  Typography,
} from "@material-ui/core";

import RouteListItem from "./routeListItem";
import { Workspace } from "../store/types";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  workspace: Workspace;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      paddingLeft: theme.spacing(2),
      display: "flex",
      alignItems: "center",
    },
    buttonWrapper: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(3),
    },
  })
);

function Sidebar(props: SidebarProps) {
  const { workspace } = props;
  const classes = useStyles();
  let location = useLocation();

  return (
    <nav className={classes.drawer}>
      <Paper className={classes.drawerPaper}>
        <div className={classes.toolbar}>
          <Typography variant="h6">{workspace.name}</Typography>
        </div>
        <Divider />
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="primary">
            Create
          </Button>
        </div>
        <List>
          {[
            { text: "Home", path: "/home" },
            { text: "View 1", path: "/view1" },
          ].map((item, index) => (
            <RouteListItem
              selected={location.pathname === item.path}
              key={index}
              to={item.path}
              primary={item.text}
            />
          ))}
        </List>
      </Paper>
    </nav>
  );
}

export default Sidebar;
