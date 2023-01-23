import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import DoneAllIcon from '@mui/icons-material/DoneAll';
import DashboardIcon from '@mui/icons-material/Dashboard';


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
    <ListMenu dataListMenu={dataListMenu} menuRole={"Manager"} />
  );
};

export default ManagerMenu;
