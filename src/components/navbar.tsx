import * as React from "react";

import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

import { User } from "../store/types";
import { useAuth } from "../context/auth";

/* Styles for the Material-UI items */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

interface NavbarProps {
  title: string;
  user: User;
}

function Navbar(props: NavbarProps) {
  const { user, title } = props;
  const classes = useStyles();
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
      getContentAnchorEl={null}
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
          <Typography variant="h6">{title}</Typography>
          <div className={classes.grow} />
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar
              className={classes.orange}
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
