import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import store from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Routing } from "./Home";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
