import React from "react";
import ReactDOM from "react-dom";
import "./ProfileButtonStudent.css";
import Button from "react-bootstrap/Button";
import UserProfileStudent from "../UserProfileStudent/UserProfileStudent.jsx";
import axios from "axios";
class ProfileButtonStudent extends React.Component {
  constructor(props) {
    super(props);
  }
  async showProfile() {
    let profile = await axios.post("/GetUser", {
      fullName: localStorage.fullName,
    });
    ReactDOM.unmountComponentAtNode(document.getElementById("interface"));
    ReactDOM.render(
      <UserProfileStudent profile={profile.data} />,
      document.getElementById("interface")
    );
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              id="ChatRoomButton"
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
export default ProfileButtonStudent;
