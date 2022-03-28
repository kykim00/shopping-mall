import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./scss/index.scss";
import App from "./App";
import { worker } from "./mocks/browser";
import { RecoilRoot } from "recoil";

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
