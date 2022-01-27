import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import * as request from "../request";
import { SignInParams } from "../request/types";
import { useAuth } from "../context/auth";
import { hasFormError } from "../utils";
import {
  receiveWorkspaces,
  setCurrentWorkspaceID,
  setCurrentUser,
} from "../actions";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string().required("Please enter a valid password"),
});

/**
 * Sign In View to authenticate users
 */
function SignIn(props: ConnectedProps<typeof connector>) {
  const { dispatch } = props;
  const authContext = useAuth();
  const [errorMsg, setErrorMsg] = React.useState("");
  const initialValues: SignInParams = {
    email: "",
    password: "",
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Paper style={{ padding: 24 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setErrorMsg("");
              try {
                const {
                  user,
                  workspaces,
                  currentWorkspaceID,
                } = await request.signIn(values);

                if (workspaces) {
                  dispatch(receiveWorkspaces(workspaces));
                }
                if (currentWorkspaceID) {
                  dispatch(setCurrentWorkspaceID(currentWorkspaceID));
                }
                if (user) {
                  dispatch(setCurrentUser(user));
                }
                if (user.token) {
                  authContext.setAuthToken(user.token);
                }
              } catch (e) {
                setErrorMsg(e.message);
                setSubmitting(false);
              }
            }}
          >
            {(f) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Sign in</Typography>
                    {errorMsg && <div>{errorMsg}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      error={false}
                      helperText={hasFormError(f, "email")}
                      label="Email address"
                      placeholder="Your email address"
                      variant="filled"
                      fullWidth
                      {...f.getFieldProps("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      error={false} // TODO
                      helperText={hasFormError(f, "password")}
                      label="Password"
                      variant="filled"
                      fullWidth
                      {...f.getFieldProps("password")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={f.isSubmitting}
                    >
                      Sign in
                    </Button>
                    <Link
                      style={{ marginLeft: 16 }}
                      component={RouterLink}
                      to="/signup"
                    >
                      Get a new account
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
}

const connector = connect();
export default connector(SignIn);
