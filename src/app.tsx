import * as React from "react"
import { Provider as ReduxProvider } from "react-redux"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"

import {
    createTheme,
    ThemeProvider,
    StyledEngineProvider,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import useMediaQuery from "@mui/material/useMediaQuery"

import { AuthProvider, useAuth } from "./context/auth"
import SignUp from "./pages/signup"
import SignIn from "./pages/signin"
import Workspace from "./pages/workspace"
import store from "./app/store"

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme { }
// }

function AuthenticatedApp() {
    const authContext = useAuth()
    return true ? (
        // return authContext.hasAuthToken() ? (
        <Workspace />
    ) : (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate replace to="/signup" />} />
        </Routes>
    )
}

function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    )

    return (
        <StyledEngineProvider injectFirst>
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
        </StyledEngineProvider>
    )
}

export default App
