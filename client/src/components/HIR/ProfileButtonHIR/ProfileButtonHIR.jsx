import React from "react";
import ReactDOM from "react-dom";
import "./ProfileButtonHIR.css";
import Button from "react-bootstrap/Button";
import UserProfileHIR from "../../HIR/UserProfileHIR/UserProfileHIR.jsx";

class ProfileButtonHIR extends React.Component {
  constructor(props) {
    super(props);
  }
  showProfile() {
    ReactDOM.unmountComponentAtNode(document.getElementById("interface"));
    ReactDOM.render(
      <UserProfileHIR profile={this.props.profile} />,
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
