import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import dayjs from "dayjs";
import "dayjs/locale/th";

const theme = createTheme(({
  palette: {
    text: {
      primary: "#212b36",
      secondary: "#919eab",
      third: "#637381"
    }
  },
  typography: {
    h1: {
      color: "#212b36"
    },
    h2: {
      color: "#212b36"
    },
    h3: {
      color: "#212b36"
    },
    h4: {
      color: "#212b36"
    },
    h5: {
      color: "#212b36"
    },
    h6: {
      color: "#212b36"
    },
    body1: {
      color: "#212b36"
    },
    body2: {
      color: "#212b36"
    },
    fontFamily: [
      "Poppins",
      "Prompt",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}));

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
