import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import DoneAllIcon from '@material-ui/icons/DoneAll';
import DashboardIcon from '@material-ui/icons/Dashboard';


const ManagerMenu = () => {
  const dataListMenu = [
    {
      listItemIcon: <DashboardIcon />,
      listItemText: "Dashboard",
      listLink: "/manager/dashboard",
      listKey:"dashboard",
    },
    {
      listItemIcon: <DoneAllIcon />,
      listItemText: "Approved",
      listLink: "/manager/approved",
      listKey:"Approved",
    },
  ];

  return (
    <ListMenu dataListMenu={dataListMenu} />
  );
};

export default ManagerMenu;
