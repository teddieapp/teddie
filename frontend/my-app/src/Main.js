import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";
import DrawerMenu from "./components/DrawerMenu";
import { Router } from "@reach/router";
import Trend from "./components/Trend";
import Overview from "./components/Overview";

import Moods from "./components/Moods"

const drawerWidth = 240;

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`
      },
    },
    toolBarBg: {
      background: "linear-gradient(45deg, #bf360c 30%, #ad1457 90%)"

    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      width: 0
    }
  }),
  { options: { withTheme: true } }
);


const OverviewHeader = props => (
  <Typography variant="h6" color="inherit" noWrap>
    Teddie
  </Typography>
);
const TrendHeader = props => (
  <Typography variant="h6" color="inherit" noWrap>
    Trend
  </Typography>
);
const MoodsHeader = props => (
  <Typography variant="h6" color="inherit" noWrap>
    Moods
  </Typography>
);

const Main = props => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBarBg}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Router>
            <OverviewHeader path="/" />
            <TrendHeader path="/trend" />
            <MoodsHeader path = "/moods"/>
          </Router>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <DrawerMenu classes={classes} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <DrawerMenu classes={classes} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Overview path="/" />
          <Trend path="/trend" />
          <Moods path="/moods" />
        </Router>
      </main>
    </div>
  );
};

Main.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object
};

export default Main;
