import React from "react";
import ListMenu from "../../../pages/shared/listMenu";

import PersonIcon from "@mui/icons-material/Person";

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
