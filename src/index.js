import React from "react";
import ReactDOM from "react-dom";
import {AuthContextProvider} from "./contexts/AuthContext";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.render(
  <React.StrictMode>
  <AuthContextProvider>
  <ContextProvider>
      <App />
  </ContextProvider>
  </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
