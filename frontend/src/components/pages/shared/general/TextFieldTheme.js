import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyleTextField = styled(TextField)(({ variant }) => ({
  width: "100%",
  "& .MuiInputLabel-root": {
    color: "#637381",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "& .MuiOutlinedInput-input": {
      padding: "13.5px 14px",
    },
    "& .MuiInputBase-inputMultiline": {
      padding: 0,
    },
  },
  ...(variant === "filled" && {
    "& .MuiFilledInput-root, .MuiFilledInput-root:-webkit-autofill": {
      borderRadius: 8,
      backgroundColor: "#919eab14",
      "& .MuiFilledInput-input": {
        borderRadius: 8,
      },
    },
    "& .MuiFilledInput-root:before, .MuiFilledInput-root:after": {
      display: "none",
    },
  }),
}));

const TextFieldTheme = (props) => {
  return <StyleTextField {...props} />;
};


export default TextFieldTheme;