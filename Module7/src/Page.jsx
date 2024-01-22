import React from "react";
// import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Contents from "./Contents.jsx";

// function NavBar() {
//   return (
//     <NavBar bg="dark" variant="dark">
//       <NavBar.Brand href="/">Employee Management Application</NavBar.Brand>
//       <Nav>
//         <Nav.Link href="/employees">All Employees</Nav.Link>
//         <Nav.Link href="/report">Reports</Nav.Link>
//       </Nav>
//     </NavBar>
//   );
// }

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Employee Management Application</Navbar.Brand>
      <Nav>
        <Nav.Link href="/employees">All Employees</Nav.Link>
        <Nav.Link href="/report">Reports</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
