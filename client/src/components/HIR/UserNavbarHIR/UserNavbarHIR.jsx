import React from "react";
import "./UserNavbarHIR.css";
import $ from "jquery";
import CohortButtonHIR from "../CohortButtonHIR/CohortButtonHIR.jsx";
import ChatRoomButton from "../../ADMIN/ChatRoomButton/ChatRoomButton.jsx";
import ProfileButtonHIR from "../ProfileButtonHIR/ProfileButtonHIR.jsx";
import axios from "axios";
import PinBoardButton from "../PinBoardButton/PinBoardButton.jsx";
import LogoutButton from "../../LogoutButton/LogoutButton.jsx";
import AnimatedBg from "react-animated-bg";
class UserNavbarHIR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: true,
      data: [],
      current: {},
    };
  }
  async componentWillMount() {
    let data = await axios.post("/GetUser", {
      fullName: localStorage.fullName,
    });
    this.setState({ current: data.data });
    console.log(this.state.current);
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
        <AnimatedBg
          colors={["GhostWhite", "Gainsboro", "LightGrey"]}
          duration={0.5}
          delay={2}
          timingFunction="linear"
          className="section-styles"
        >
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
              <CohortButtonHIR />
              <ChatRoomButton />
              <PinBoardButton />
              <ProfileButtonHIR profile={this.state.current} />
              <LogoutButton />
            </div>
          </div>
          <div id="interface"></div>
        </AnimatedBg>
        ;
      </div>
    );
  }
}
export default UserNavbarHIR;
