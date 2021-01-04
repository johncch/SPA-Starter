import * as React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  NavLink as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface RouteListItemProps {
  selected?: boolean;
  icon?: React.ReactElement;
  to: string;
  primary: string;
}

function RouteListItem(props: RouteListItemProps) {
  const { to, icon, primary, selected } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem selected={selected} button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}

export default RouteListItem;
