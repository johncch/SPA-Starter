import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { AuthProvider, useAuth } from "./context/auth";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Workspace from "./pages/workspace";
import store from "./store/configureStore";

function AuthenticatedApp() {
  const authContext = useAuth();
  return authContext.hasAuthToken() ? (
    <Workspace />
  ) : (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Redirect to="/signup"></Redirect>
    </Switch>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ReduxProvider store={store}>
          <Router>
            <AuthenticatedApp />
          </Router>
        </ReduxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
