import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Divider from "@material-ui/core/Divider";
import { Link } from "@reach/router";

const DrawerMenu = ({ classes }) => {
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/">
          <ListItem button key="Overview">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
        </Link>
        <Link to="/trend">
          <ListItem button key="Trend">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Trend" />
          </ListItem>
        </Link>
        <Link to="/moods">
          <ListItem button key="Moods">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Moods" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List> */}
    </div>
  );
};

export default DrawerMenu;
