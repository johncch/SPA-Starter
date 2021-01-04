import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Container,
  Typography,
  Link,
} from "@material-ui/core";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAuth } from "../context/auth";
import * as request from "../request";
import { hasFormError } from "../utils";
import { SignUpParams } from "../request/types";
import { connect, ConnectedProps } from "react-redux";
import { receiveWorkspaces, setCurrentWorkspaceID } from "../actions";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Please use a password"),
  fullName: Yup.string().required("Please tell us your name"),
});

function SignUp(props: ConnectedProps<typeof connector>) {
  const { dispatch } = props;
  const authContext = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");
  const initialValues: SignUpParams = {
    email: "",
    password: "",
    fullName: "",
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Paper style={{ padding: 24 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setErrorMessage("");
              try {
                const {
                  user,
                  workspaces,
                  currentWorkspaceID,
                } = await request.signUp(values);
                if (workspaces) {
                  dispatch(receiveWorkspaces(workspaces));
                }
                if (currentWorkspaceID) {
                  dispatch(setCurrentWorkspaceID(currentWorkspaceID));
                }
                if (user.token) {
                  authContext.setAuthToken(user.token);
                }
              } catch (e) {
                setErrorMessage(e.message);
                setSubmitting(false);
              }
            }}
          >
            {(f) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Sign up</Typography>
                    {errorMessage && <div>{errorMessage}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      error={false}
                      helperText={hasFormError(f, "fullName")}
                      label="Full name"
                      placeholder="Your full name"
                      variant="filled"
                      fullWidth
                      {...f.getFieldProps("fullName")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      placeholder="Your email address"
                      error={false}
                      helperText={hasFormError(f, "email")}
                      label="Email address"
                      variant="filled"
                      fullWidth
                      {...f.getFieldProps("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      error={false}
                      helperText={hasFormError(f, "password")}
                      label="Password"
                      // helpText="Please use at least 8 characters with uppercase, lowercase, numbers and special characters"
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
                      Sign up
                    </Button>
                    <Link
                      style={{ marginLeft: 16 }}
                      component={RouterLink}
                      to="/signin"
                    >
                      Sign in instead?
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
export default connector(SignUp);
