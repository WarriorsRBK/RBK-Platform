import React from "react";
import ReactDOM from "react-dom";
import "./ChatRoomButton.css";
import Button from "react-bootstrap/Button";
import ChatRoom from "../../ChatRoom/ChatRoom.jsx";

class ChatRoomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * @function showChatRoom it just render the chat room after a user click
   */
  showChatRoom() {
    ReactDOM.render(<ChatRoom />, document.getElementById("interface"));
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="ChatRoomButton"
              onClick={this.showChatRoom.bind(this)}
              block
            >
              Chat Room
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
export default ChatRoomButton;
