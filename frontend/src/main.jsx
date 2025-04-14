import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

const shouldForwardProp = (prop) => prop !== "variation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <App />
        </StyleSheetManager>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
