import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./UserProfile.css";
import Calendar from "../Calendar/Calendar.jsx";
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      image: "./male.jpg",
    };
  }
  componentWillMount() {
    for (let i = 0; i < this.props.profiles.length; i++) {
      if (this.props.profiles[i].fullName === this.props.fullName) {
        const currentProfile = this.props.profiles[i];
        if (currentProfile.Gender === "Female") {
          this.setState({ image: "./female.jpg" });
        }
        this.setState({ profile: currentProfile });
      }
    }
  }
  render() {
    return (
      <div id="profilecontainer2">
        <Container>
          <Row>
            <Col className="picture" sm="2">
              <img className="profilesPictures" src={this.state.image}></img>
            </Col>
            <Col className="profile" sm="10">
              <p className="userProfilePara">
                FullName: {this.state.profile.fullName}
              </p>
              <p className="userProfilePara">
                Gender: {this.state.profile.Gender}
              </p>
              <p className="userProfilePara">
                Cohort: {this.state.profile.cohort}{" "}
              </p>
              <p className="userProfilePara">
                {" "}
                Role: {this.state.profile.role}{" "}
              </p>
              <p className="userProfilePara">
                {" "}
                E-mail: {this.state.profile.email}{" "}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default UserProfile;
