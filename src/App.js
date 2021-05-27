import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import clsx from "clsx";

import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Header, AdminMenu, ManagerMenu, UserMenu } from "./components/layouts";
import Routers from "./Routers"
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '4px'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    }
  },
}));

const drawerUseStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
  },
  bannerOpen: {
    backgroundImage:
      // "url(" +
      // process.env.PUBLIC_URL +
      // "/images/background_menu.jpg" +
      // ")"
      `url(${process.env.PUBLIC_URL}/images/background_menu.jpg)`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#1E88E5",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  isActive: {
    backgroundColor: "#e0f5fd",
    color: "#0080ff",
  },
}));

const drawerWidth = 240;

const DrawerContainer = ({ open }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.roles.includes("ROLE_ADMIN"));
      setIsManager(currentUser.roles.includes("ROLE_MANAGER"));
    }
  }, [currentUser]);

  const classes = drawerUseStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.bannerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}></div>
      <UserMenu />
      {isManager && (
        <Fragment>
          <Divider />
          <ManagerMenu />
        </Fragment>
      )}
      {isAdmin && (
        <Fragment>
          <Divider />
          <AdminMenu open={open}/>
        </Fragment>
      )}
    </Drawer>
  );
};

function App() {
  useStyles();
  const [open, setOpen] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    
  }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
 

  return (
    <Router>
        <div style={{ display: "flex" }}>
          {isLoggedIn && (
            <Fragment>
              <Header handleDrawerOpen={handleDrawerOpen} />
              <DrawerContainer
                open={open}
              />
            </Fragment>
          )} 
          <Routers />
        </div>
    </Router>
  );
}

export default App;
