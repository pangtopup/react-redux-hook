import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import PersonIcon from "@material-ui/icons/Person";

const UserMenu = () => {

  const dataListMenu = [
    {
      listItemIcon: <PersonIcon />,
      listItemText: "Profile",
      listLink: "/profile",
      listKey:"profile",
    },
  ];

  return (
    <ListMenu key="user" dataListMenu={dataListMenu} />
  );
};

export default UserMenu;
