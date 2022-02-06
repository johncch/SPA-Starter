import * as React from "react"
import { connect, ConnectedProps } from "react-redux"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"

import { styled } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import Container, { ContainerProps } from "@mui/material/Container"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

import { fetchCurrentUserIfNeeded, fetchWorkspacesIfNeeded } from "../actions"

import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import Home from "./home"
import View1 from "./view1"
import { useAppDispatch } from "../app/hook"
import { RootState } from "../app/store"

const EmptyContainer = styled(Container)<ContainerProps>({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
})

const ContainerDiv = styled("div")({
    height: "100%",
    display: "flex",
    flexDirection: "row",
})

const AppBody = styled("div")({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
})

const Content = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
}))

function Workspace(props: ConnectedProps<typeof connector>) {
    const { currentUser, errorMessage, currentWorkspace } = props
    const dispatch = useAppDispatch()
    // const location = useLocation();
    // const background = location.state && location.state.background;

    React.useEffect(() => {
        if (!currentUser) {
            dispatch(fetchCurrentUserIfNeeded())
        }
    }, [currentUser])
    React.useEffect(() => {
        if (!currentWorkspace) {
            dispatch(fetchWorkspacesIfNeeded())
        }
    }, [currentWorkspace])

    if (errorMessage) {
        return (
            <EmptyContainer>
                <Alert severity="error">
                    <AlertTitle>Fatal Error</AlertTitle>
                    {props.errorMessage}
                </Alert>
            </EmptyContainer>
        )
    } else if (!(currentUser && currentWorkspace)) {
        return (
            <EmptyContainer>
                <CircularProgress />
            </EmptyContainer>
        )
    }

    return (
        <ContainerDiv>
            <Sidebar workspace={currentWorkspace} />
            <AppBody>
                <Navbar user={currentUser} title="" />
                <Content>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/view1" element={<View1 />} />
                        <Route
                            path="*"
                            element={<Navigate replace to="/home" />}
                        />
                    </Routes>
                </Content>
            </AppBody>
        </ContainerDiv>
    )
}

// Redux boilerplate
function mapStateToProps(state: RootState) {
    const { workspaces, user, errorMessage } = state
    const currentUser = user.user
    let currentWorkspace
    if (workspaces.activeId) {
        currentWorkspace = workspaces.workspaces[workspaces.activeId]
    }
    return { currentWorkspace, currentUser, errorMessage }
}
const connector = connect(mapStateToProps)
export default connector(Workspace)
