import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css"; // flex
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
