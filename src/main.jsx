import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import store from "./app/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
