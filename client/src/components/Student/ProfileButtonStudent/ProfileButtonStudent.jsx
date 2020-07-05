import React from "react";
import ReactDOM from "react-dom";
import "./ProfileButtonStudent.css";
import Button from "react-bootstrap/Button";
import UserProfileStudent from "../UserProfileStudent/UserProfileStudent.jsx";

class ProfileButtonStudent extends React.Component {
  constructor(props) {
    super(props);
  }
  showProfile() {
    ReactDOM.unmountComponentAtNode(document.getElementById('interface'))
    ReactDOM.render(
      <UserProfileStudent profile={this.props.profile} />,
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
