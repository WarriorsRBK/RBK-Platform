import React from "react";
import ReactDOM from "react-dom";
import Chat from "./components/ChatRoom/ChatRoom.jsx";
import Calendar from "./components/ADMIN/Calendar/Calendar.jsx";
import DeleteCohortOrUsers from "./components/ADMIN/DeleteCohortOrUsers/DeleteCohortOrUsers.jsx";
import App from "./components/App/App.jsx";
import ChatRoom from "./components/ChatRoom/ChatRoom.jsx";
import PinnedBoard from "./components/PinnedBoard/PinnedBoard.jsx"
import CreateAccount from "./components/ADMIN/CreateAccount/CreateAccount.jsx";
import LoginTest from "./components/loginTest.jsx";
import UserPorfileADMIN from "./components/ADMIN/UserProfile/UserProfile.jsx";
import UserProfile from "./components/User/UserProfile/UserProfile.jsx";
import UserNavbar from "./components/User/UserNavbar/UserNavbar.jsx";
import Login from './components/Login/login.jsx'
import Home from "./components/Home/Home.jsx";
import CreateCohort from "./components/ADMIN/CreateCohort/CreateCohort.jsx";
ReactDOM.render(<Login />, document.getElementById("app"));