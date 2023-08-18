import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { ThemeProvider } from '@mui/system';
import theme from "./util/theme.js";
import * as serviceWorker from "./serviceWorker.js";

// replace console.* for disable log on production

// This feels like good practice.

if (
  process.env.REACT_APP_ENGINE_STATE === "production" ||
  process.env.REACT_APP_ENGINE_STATE === "pre_launch"
) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.info = () => {};
}

if (
  process.env.REACT_APP_ENGINE_STATE === "no_debug"
) {
  console.log = () => {};
  //console.error = () => {};
  console.debug = () => {};
  console.info = () => {};
}



ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
</ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

/*
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
</ThemeProvider>,
  document.getElementById("root")
);
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
