import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./scss/index.scss";
import App from "./App";
import { worker } from "./mocks/browser";

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
