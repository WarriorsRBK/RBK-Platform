import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./UserProfileStudent.css";
import $ from "jquery";
import EditProfileStudent from "../EditProfileStudent/EditProfileStudent.jsx";
class UserProfileStudent extends React.Component {
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
  editProfile() {
    $("#profilecontainer").css("filter", "blur(8px)");
    $("#profilecontainer").css("-webkit-filter", "blur(8px)");
    $("#myModal").css("display", "block");
    var span = $(".close")[0];
    span.onclick = () => {
      $("#myModal").css("display", "none");
      $("#profilecontainer").css("filter", "");
      $("#profilecontainer").css("-webkit-filter", "");
    };
  }
  render() {
    return (
      <div id="userprofile">
        <div id="profilecontainer">
          <Container>
            <Row>
              <Col className="picture" sm="2">
                <img className="profilesPictures" src={this.state.image}></img>
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
              <Col className="info" sm="12">
                <div id="infoBox">Infos</div>
                <div id="editBox">
                  <Button
                    onClick={this.editProfile.bind(this)}
                    id="myBtn"
                    variant="outline-danger"
                  >
                    Edit
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="extra">
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <EditProfileStudent fullName={"Houssem Guesmi"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserProfileStudent;
