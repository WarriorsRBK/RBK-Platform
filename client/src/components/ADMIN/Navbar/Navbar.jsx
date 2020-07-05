import React from "react";
import "./Navbar.css";
import $ from "jquery";
import CreateButton from "../CreateButton/CreateButton.jsx";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import CohortsButton from "../CohortsButton/CohortsButton.jsx";
import ChatRoomButton from "../ChatRoomButton/ChatRoomButton.jsx";
import LogoutButton from "../../LogoutButton/LogoutButton.jsx";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: true,
    };
  }

  showNav() {
    $("#container").animate({ left: "0" }, 1000);
    $("#arrow").css("transform", "rotate(180deg)");
  }
  hideNav() {
    if (this.state.hover === true) {
      $("#container").animate({ left: "-350px" }, 1000);
      $("#arrow").css("transform", "");
    }
  }
  fixNav() {
    if (this.state.hover === true) {
      this.setState({ hover: false });
      $("#container").css("left", 0);
    } else {
      this.setState({ hover: true });
    }
  }
  render() {
    return (
      <div>
        <div
          id="container"
          onMouseEnter={this.showNav.bind(this)}
          onMouseLeave={this.hideNav.bind(this)}
        >
          <div id="arrowbox">
            <center>
              <img
                onClick={this.fixNav.bind(this)}
                id="arrow"
                src="./arr2.png"
              ></img>
            </center>
          </div>
          <center>
            <img src="./rbk2.png" id="rbkLogo" />
          </center>
          <div id="buttonsBox">
            <CreateButton />
            <DeleteButton />
            <CohortsButton />
            <ChatRoomButton />
            <LogoutButton />
          </div>
        </div>
        <div id="interface"></div>
      </div>
    );
  }
}
export default Navbar;
