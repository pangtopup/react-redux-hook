import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyleButtonBlue = styled(Button)(({ variant, color }) => ({
  ...(variant === "contained" && {
    borderColor: "#007afe",
    color: "#ffffff",
    backgroundColor: "#007afe",
    borderRadius: 8,
    "&:hover": {
      borderColor: "#0046b7",
      backgroundColor: "#0046b7",
    },
  }),
  ...(variant === "outlined" && {
    borderColor: "#007afe",
    backgroundColor: "transparent",
    color: "#007afe",
    borderRadius: 8,
    "&:hover": {
      borderColor: "#0046b7",
    },
  }),
  ...(variant === "text" && {
    backgroundColor: "transparent",
    color: "#007afe",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#1976d20a",
    },
  }),
  ...(variant === "text" && color === "secondary" && {
    backgroundColor: "transparent",
    color: "#212b36",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#1976d20a",
    },
  }),
}));

const ButtonBlue = (props) => {
  return (
    <StyleButtonBlue
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      style={props.style}
      size={props.size}
      variant={props.variant}
      onClick={props.onClick}
      component={props.component}
      to={props.to}
      className={props.className}
      color={props.color}
    >
      {props.children}
    </StyleButtonBlue>
  );
};

export default ButtonBlue;