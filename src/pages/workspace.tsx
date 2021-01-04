import * as React from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import {
  CircularProgress,
  Container,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { initializeWorkspace } from "../actions";
import { RootState } from "../reducers";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Home from "./home";
import View1 from "./view1";

/* Styles for the Material-UI items */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emptyContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
    },
    appBody: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function Workspace(props: ConnectedProps<typeof connector>) {
  const { currentUser, errorMessage, initialized, currentWorkspace } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    if (!initialized) {
      dispatch(initializeWorkspace());
    }
  }, [initialized]);

  if (errorMessage) {
    return (
      <Container className={classes.emptyContainer}>
        <Alert severity="error">
          <AlertTitle>Fatal Error</AlertTitle>
          {props.errorMessage}
        </Alert>
      </Container>
    );
  } else if (!initialized) {
    return (
      <Container className={classes.emptyContainer}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div className={classes.container}>
      <Sidebar workspace={currentWorkspace} />
      <div className={classes.appBody}>
        <Navbar user={currentUser} title="" />
        <main className={classes.content}>
          <Switch location={background || location}>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/view1">
              <View1 />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </main>
      </div>
    </div>
  );
}

// Redux boilerplate
function mapStateToProps(state: RootState) {
  const {
    currentWorkspaceID,
    workspaces,
    currentUser,
    errorMessage,
    initialized,
  } = state;
  let currentWorkspace;
  if (workspaces) {
    currentWorkspace = workspaces[currentWorkspaceID];
  }
  return { currentWorkspace, currentUser, errorMessage, initialized };
}
const connector = connect(mapStateToProps);
export default connector(Workspace);
