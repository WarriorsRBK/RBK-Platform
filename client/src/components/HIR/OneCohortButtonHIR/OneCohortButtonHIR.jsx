import React from "react";
import "./OneCohortButtonHIR.css";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import UserProfileHIR from "../UserProfileHIR/UserProfileHIR.jsx";
import ReactDOM from "react-dom";
import axios from "axios";
class OneCohortButtonHIR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: false,
      hirs: false,
      students: false,
      data: [],
      online: [],
    };
  }
  showChildren() {
    if (!this.state.children) {
      $(`#students${this.props.id}`).show(500);
      $(`#hirs${this.props.id}`).show(500);
      this.setState({ children: true });
    } else {
      $(`#students${this.props.id}`).hide(500);
      $(`#hirs${this.props.id}`).hide(500);
      this.setState({ children: false });
      $(`#parentstudents${this.props.id}`).hide(500);
      this.setState({ students: false });
      $(`#parenthirs${this.props.id}`).hide(500);
      this.setState({ hirs: false });
    }
  }
  showStudents() {
    if (!this.state.students) {
      $(`#parentstudents${this.props.id}`).show(500);
      this.setState({ students: true });
    } else {
      $(`#parentstudents${this.props.id}`).hide(500);
      this.setState({ students: false });
    }
  }
  // componentDidUpdate() {
  //   if (!this.props.visibility || !this.state.children) {
  //     $(`#students${this.props.id}`).hide(500);
  //     $(`#hirs${this.props.id}`).hide(500);
  //     $(`#parenthirs${this.props.id}`).hide(500);
  //     $(`#parentstudents${this.props.id}`).hide(500);
  //     // this.state.children = false;
  //     // this.state.students = false;
  //     // this.state.hirs = false;
  //   }
  // }
  showHirs() {
    if (!this.state.hirs) {
      $(`#parenthirs${this.props.id}`).show(500);
      this.setState({ hirs: true });
    } else {
      $(`#parenthirs${this.props.id}`).hide(500);
      this.setState({ hirs: false });
    }
  }
  async showProfile(e) {
    const fullName = e.target.innerText;
    let profile = await axios.post("/GetUser", { fullName });
    ReactDOM.unmountComponentAtNode(document.getElementById("interface"));
    ReactDOM.render(
      <UserProfileHIR fullName={fullName} profile={profile.data} />,
      document.getElementById("interface")
    );
  }
  componentDidUpdate() {
    if (!this.props.visibility || !this.state.children) {
      $(`#students${this.props.id}`).hide(500);
      $(`#hirs${this.props.id}`).hide(500);
      $(`#parenthirs${this.props.id}`).hide(500);
      $(`#parentstudents${this.props.id}`).hide(500);
      this.state.children = false;
      this.state.students = false;
      this.state.hirs = false;
    }
  }
  async componentDidMount() {
    $(`#parentstudents${this.props.id}`).css("display", "none");
    $(`#parenthirs${this.props.id}`).css("display", "none");
    $(`#students${this.props.id}`).css("display", "none");
    $(`#hirs${this.props.id}`).css("display", "none");
    $(`#students${this.props.id}`).css("margin-top", "10px");
    $(`#hirs${this.props.id}`).css("margin-top", "10px");
    let online = await axios.post("/loggedUsers");
    this.setState({ online: online.data });
  }
  render() {
    return (
      <div>
        <ul id="left">
          <li id={`cohort${this.props.id}`}>
            <Button
              variant="light"
              onClick={this.showChildren.bind(this)}
              id="cohortButt"
            >
              Cohort {this.props.id}
            </Button>

            <ul>
              <li id={`hirs${this.props.id}`}>
                <Button
                  variant="outline-light"
                  onClick={this.showHirs.bind(this)}
                >
                  HIRs
                </Button>
                <ul id={`parenthirs${this.props.id}`}>
                  {this.props.data.map((element, index) => {
                    if (
                      element.cohort === this.props.id &&
                      element.role === "HIR" &&
                      element.fullName !== localStorage.fullName
                    ) {
                      return (
                        <li key={index} className="hirs">
                          <Button
                            onClick={this.showProfile.bind(this)}
                            variant="light"
                            block
                          >
                            <div className="onlinecheck" />
                            {this.state.online.includes(element.fullName) ? (
                              <div className="green"></div>
                            ) : (
                              <div className="red"></div>
                            )}
                            {element.fullName}
                          </Button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </li>
              <li id={`students${this.props.id}`}>
                <Button
                  variant="outline-light"
                  onClick={this.showStudents.bind(this)}
                >
                  Students
                </Button>
                <ul id={`parentstudents${this.props.id}`}>
                  {this.props.data.map((element, index) => {
                    if (
                      element.cohort === this.props.id &&
                      element.role === "Student" &&
                      element.fullName !== localStorage.fullName
                    ) {
                      return (
                        <li key={index} className="students">
                          <Button
                            onClick={this.showProfile.bind(this)}
                            variant="light"
                            block
                          >
                            <div className="onlinecheck" />
                            {this.state.online.includes(element.fullName) ? (
                              <div className="green"></div>
                            ) : (
                              <div className="red"></div>
                            )}
                            {element.fullName}
                          </Button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
export default OneCohortButtonHIR;
