import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Navbar from "../ADMIN/Navbar/Navbar.jsx";
import StudentNavbar from "../Student/UserNavbarStudent/UserNavbarStudent.jsx";
import HIRNavbar from "../HIR/UserNavbarHIR/UserNavbarHIR.jsx";
import AnimatedBg from "react-animated-bg";
export default function App() {
  if (!localStorage.fullName) {
    return (
      <div>
        <Home />
      </div>
    );
  } else if (localStorage.role === "ADMIN") {
    $("body").css("background-color", "#a9a9a9");
    return (
      <div>
        <Navbar />
      </div>
    );
  } else if (localStorage.role === "HIR") {
    $("body").css("background-color", "#a9a9a9");
    return (
      <div>
        <HIRNavbar />
      </div>
    );
  } else {
    $("body").css("background-color", "#a9a9a9");
    return (
      <div>
        <StudentNavbar />
      </div>
    );
  }
}
