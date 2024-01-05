import React from "react";
import reactDOM from "react-dom";

import { createRoot } from "react-dom/client";

import EmployeeList from "./EmployeeList.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <EmployeeList />
  </React.StrictMode>
);
