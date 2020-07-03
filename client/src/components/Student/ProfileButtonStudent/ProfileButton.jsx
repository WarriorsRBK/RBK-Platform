import React from "react";
import ReactDOM from "react-dom";
import "./ProfileButton.css";
import Button from "react-bootstrap/Button";
import UserProfile from "../../User/UserProfile.jsx";

class ProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showChatRoom() {
    ReactDOM.render(<UserProfile />, document.getElementById("interface"));
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
export default ProfileButton;
