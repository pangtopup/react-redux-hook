import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from "@material-ui/icons/Settings";
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";
import Filter3Icon from "@material-ui/icons/Filter3";

const AdminMenu = () => {
  const dataListMenu = [
    {
      listItemIcon: <DashboardIcon />,
      listItemText: "Dashboard",
      listLink: "",
      listKey:"dashboard",
      collapse: [
        {
          listItemIcon: <Filter1Icon />,
          listItemText: "Dashboard1",
          listLink: "/admin/dashboard1",
          listKey:"dashboard1",
        },
        {
          listItemIcon: <Filter2Icon />,
          listItemText: "Dashboard2",
          listLink: "/admin/dashboard2",
          listKey:"dashboard2",
        },
        {
          listItemIcon: <Filter3Icon />,
          listItemText: "Dashboard3",
          listLink: "/admin/dashboard3",
          listKey:"dashboard3",
        },
      ],
    },
    {
      listItemIcon: <PeopleIcon />,
      listItemText: "Employees",
      listLink: "/admin/employees",
      listKey:"employees",
    },
    {
      listItemIcon: <SettingsIcon />,
      listItemText: "Setting",
      listLink: "/admin/setting",
      listKey:"setting",
    },
  ];

  return (
    <ListMenu dataListMenu={dataListMenu} />
  );
};

export default AdminMenu;
