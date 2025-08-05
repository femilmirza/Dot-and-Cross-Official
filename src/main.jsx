// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./App"; // or wherever your file with App/Root is
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Root />
    </HelmetProvider>
  </React.StrictMode>
);
