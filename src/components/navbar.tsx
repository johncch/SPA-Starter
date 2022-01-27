import * as React from "react";
// import { css } from "@emotion/react";
import { styled } from '@mui/system';

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { deepOrange } from "@mui/material/colors";

import { User } from "../store/types";
import { useAuth } from "../context/auth";

interface NavbarProps {
  title: string;
  user: User;
}

const Spacer = styled("div")`
  flex-grow: 1;
`

function Navbar(props: NavbarProps) {
  const { user, title } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const authContext = useAuth();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    authContext.clearAuthToken();
    handleMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">{title}ASDF</Typography>
          <Spacer />
          <IconButton onClick={handleProfileMenuOpen} size="large">
            <Avatar
              sx={{
                color: (theme) => theme.palette.getContrastText(deepOrange[500]),
                backgroundColor: deepOrange[500],
              }}
              alt={user.fullname}
              src={user.url}
            ></Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </React.Fragment>
  );
}

export default Navbar;
