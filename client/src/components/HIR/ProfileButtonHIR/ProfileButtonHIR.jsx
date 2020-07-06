import React from "react";
import ReactDOM from "react-dom";
import "./ProfileButtonHIR.css";
import Button from "react-bootstrap/Button";
import UserProfileHIR from "../../HIR/UserProfileHIR/UserProfileHIR.jsx";
import axios from "axios";
class ProfileButtonHIR extends React.Component {
  constructor(props) {
    super(props);
  }
  async showProfile() {
    let profile = await axios.post("/GetUser", {
      fullName: localStorage.fullName,
    });
    ReactDOM.unmountComponentAtNode(document.getElementById("interface"));
    ReactDOM.render(
      <UserProfileHIR profile={profile.data} />,
      document.getElementById("interface")
    );
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              id="profileButtonHIR"
              onClick={this.showProfile.bind(this)}
              variant="outline-light"
            >
              Profile
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
export default ProfileButtonHIR;
