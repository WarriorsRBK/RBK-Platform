import React from "react";
import ReactDOM from "react-dom";
import "./LogoutButton.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout() {
    axios.post("/deleteOnline", { fullName: localStorage.fullName });
    localStorage.clear();
    location.reload();
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="LogoutButton"
              onClick={this.logout.bind(this)}
              block
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
export default LogoutButton;
