import React from "react";
import ReactDOM from "react-dom";
import "./ProfileButtonStudent.css";
import Button from "react-bootstrap/Button";
import UserProfileStudent from "../UserProfileStudent/UserProfileStudent.jsx";

class ProfileButtonStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showChatRoom() {
    ReactDOM.render(
      <UserProfileStudent />,
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
              onClick={this.showChatRoom.bind(this)}
              variant="outline-light"
            >
              Chat Room
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
export default ProfileButtonStudent;
