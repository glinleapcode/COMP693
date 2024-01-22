import React from "react";
import reactDOM from "react-dom";
// import { HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";

// import EmployeeList from "./EmployeeList.jsx";
import Page from "./Page.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  </BrowserRouter>
);
