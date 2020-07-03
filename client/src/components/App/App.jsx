import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Navbar from "../ADMIN/Navbar/Navbar.jsx";
import NavbarUser from "../User/UserNavbar/UserNavbar.jsx";
export default function App() {
  if (localStorage.role === "ADMIN") {
    return (
      <div>
        <Navbar />
      </div>
    );
  } else if (localStorage.role === "HIR") {
    return (
      <div>
        <NavbarUser />
      </div>
    );
  }
}
