import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  isActive: {
    color: "#3f51b5",
    fontWeight: "700 !important",
  },
  nestedOpen: {
    "& .MuiListItemIcon-root": {
      display: "flex",
      justifyContent: "center",
    },
  },
  nestedClose: {
    "& .MuiListItemIcon-root": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
}));

const ListMenu = (props) => {
  const classes = useStyles();
  const [dataListMenu] = useState(props.dataListMenu);
  const [openCollapse, setOpenCollapse] =
    React.useState(-1);

  const handleClickCollapse = (index) => {
      if (openCollapse === index) {
        setOpenCollapse(-1);
      } else {
        setOpenCollapse(index);
      }
    
  };

  return (
    <List subheader={
      props.menuRole && <ListSubheader>{props.menuRole}</ListSubheader>
    }>
      {dataListMenu.map((value, index) => {
        return (
          <Fragment>
            {value.collapse ? (
              <Fragment>
                <ListItem
                  onClick={() => handleClickCollapse(index)}
                  activeclassname={classes.isActive}
                  key={value.listKey}
                >
                  <ListItemIcon>{value.listItemIcon}</ListItemIcon>
                  <ListItemText primary={value.listItemText} />
                  {openCollapse === index ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={openCollapse === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {value.collapse.map((collapse) => {
                      return (
                        <ListItem
                          component={NavLink}
                          to={collapse.listLink}
                          button
                          key={collapse.listKey}
                          className={
                            props.open
                              ? classes.nestedOpen
                              : classes.nestedClose
                          }
                          activeclassname={classes.isActive}
                        >
                          <ListItemIcon>
                            {collapse.listItemIcon}
                          </ListItemIcon>
                          <ListItemText primary={collapse.listItemText} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </Fragment>
            ) : (
              <ListItem
                component={NavLink}
                to={value.listLink}
                button
                key={value.listKey}
                activeclassname={classes.isActive}
              >
                <ListItemIcon>
                  {value.listItemIcon}
                </ListItemIcon>
                <ListItemText primary={value.listItemText} />
              </ListItem>
            )}
          </Fragment>
        );
      })}
    </List>
  );
};

export default ListMenu;
