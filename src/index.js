import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PhotoProvider } from "./contexts/PhotoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PhotoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PhotoProvider>
  </React.StrictMode>
);
