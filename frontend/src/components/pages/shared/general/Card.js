import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

const StyledCard = styled(Card)(({ fullheight }) => ({
  //marginTop: 16,
  boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  borderRadius: 20,
  height: "fit-content",
  ...(fullheight === "true" && {
    height: "100%",
  }),
  "& .cardTitle": {
    fontSize: 22,
  },
  "& .MuiCardContent-root": {
    padding: 24,
  },
  "& .cardHeader": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
}));

const CardStyle = (props) => {
  return <StyledCard {...props}>{props.children}</StyledCard>;
};

export default CardStyle;
