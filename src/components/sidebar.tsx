import * as React from "react"
import { styled } from "@mui/material/styles"

import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import RouteListItem from "./routeListItem"
import { Workspace } from "../app/types"
import { useLocation } from "react-router-dom"

interface SidebarProps {
    workspace: Workspace
}

const drawerWidth = 240

const SidebarEl = styled("nav")(({ theme }) => ({
    display: "flex",
    flexShrink: 1,
    [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
    },
}))

const Toolbar = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(2),
    display: "flex",
    alignItems: "center",
}))

const ButtonWrapper = styled("div")(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(3),
}))

function Sidebar(props: SidebarProps) {
    const { workspace } = props
    const location = useLocation()

    return (
        <SidebarEl>
            <Paper
                sx={{
                    width: drawerWidth,
                }}
            >
                <Toolbar>
                    <Typography variant="h6">{workspace.name}</Typography>
                </Toolbar>
                <Divider />
                <ButtonWrapper>
                    <Button variant="contained" color="primary">
                        Create
                    </Button>
                </ButtonWrapper>
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
        </SidebarEl>
    )
}

export default Sidebar
