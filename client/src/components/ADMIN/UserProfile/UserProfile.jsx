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
      <div id="profilecontainer">
        <Container>
          <Row>
            <Col className="picture" sm="2">
              <img src={this.state.image}></img>
            </Col>
            <Col className="profile" sm="10">
              <p>FullName: {this.state.profile.fullName}</p>
              <p>Gender: {this.state.profile.Gender}</p>
              <p>Cohort: {this.state.profile.cohort} </p>
              <p> Role: {this.state.profile.role} </p>
              <p> E-mail: {this.state.profile.email} </p>
            </Col>
          </Row>
          <Row>
            <Col className="info" sm="12"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default UserProfile;
