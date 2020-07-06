import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./UserProfileHIR.css";
import $ from "jquery";
import EditProfileHIR from "../EditProfileHIR/EditProfileHIR.jsx";
import axios from "axios";
class UserProfileHIR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      image: "./male.jpg",
      context: this.props.profile.fullName === localStorage.fullName,
    };
    console.log(this.state.context);
  }
  // async componentWillMount() {
  //   let data = await axios.post("/GetUser", {
  //     fullName: localStorage.fullName,
  //   });
  //   this.setState({ profile: data.data });
  // }
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
  storeNotes() {
    localStorage.notes = " " + $("#notes").val();
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
                <label className="profileLabels">
                  FullName: {this.props.profile.fullName}
                </label>
                <br />
                <label className="profileLabels">
                  Gender: {this.props.profile.Gender}
                </label>
                <br />
                <label className="profileLabels">
                  Cohort: {this.props.profile.cohort}
                </label>
                <br />
                <label className="profileLabels">
                  Role: {this.props.profile.role}
                </label>
                <br />
                <label className="profileLabels">
                  E-mail: {this.props.profile.email}
                </label>
              </Col>
            </Row>
            <Row>
              {this.state.context ? (
                <Col className="info" sm="12">
                  <div id="todaysNotesBox">
                    <div id="todaysNotes">
                      <label id="notesLabel">Today's Notes:</label>
                      <br />
                      {localStorage.notes ? (
                        <textarea
                          type="text"
                          id="notes"
                          defaultValue={localStorage.notes}
                          onChange={this.storeNotes.bind(this)}
                        ></textarea>
                      ) : (
                        <textarea
                          type="text"
                          id="notes"
                          onChange={this.storeNotes.bind(this)}
                        ></textarea>
                      )}
                    </div>

                    <div id="editBox">
                      <Button
                        onClick={this.editProfile.bind(this)}
                        id="myBtn"
                        variant="outline-danger"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Col>
              ) : null}
            </Row>
          </Container>
        </div>
        <div id="extra">
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <EditProfileHIR fullName={localStorage.fullName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserProfileHIR;
