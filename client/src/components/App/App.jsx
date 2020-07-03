import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Navbar from "../ADMIN/Navbar/Navbar.jsx";
export default function App() {
  if (localStorage.role === "HIR") {
    return (
      <div>
        <Navbar />
      </div>
    );
  } else {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
