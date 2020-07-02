import React from "react";
import "./OneCohortButton.css";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import UserProfile from "../UserProfile/UserProfile.jsx";
import ReactDOM from "react-dom";

class OneCohortButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: false,
      hirs: false,
      students: false,
      data: [],
    };
    console.log(this.props);
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
      this.setState({ nirs: false });
    }
  }
  showProfile(e) {
    const fullName = e.target.innerText;
    console.log(fullName);
    ReactDOM.unmountComponentAtNode(document.getElementById("interface"));
    ReactDOM.render(
      <UserProfile fullName={fullName} profiles={this.props.data} />,
      document.getElementById("interface")
    );
  }
  componentDidMount() {
    $(`#parentstudents${this.props.id}`).css("display", "none");
    $(`#parenthirs${this.props.id}`).css("display", "none");
    $(`#students${this.props.id}`).css("display", "none");
    $(`#hirs${this.props.id}`).css("display", "none");
    $(`#students${this.props.id}`).css("margin-top", "10px");
    $(`#hirs${this.props.id}`).css("margin-top", "10px");
  }
  render() {
    return (
      <div>
        <ul id="left">
          <li id={`cohort${this.props.id}`}>
            <Button
              variant="outline-light"
              onClick={this.showChildren.bind(this)}
              id="cohortButt"
            >
              Cohort {this.props.id}
            </Button>

            <ul>
              <li id={`hirs${this.props.id}`}>
                <Button variant="light" onClick={this.showHirs.bind(this)}>
                  HIRs
                </Button>
                <ul id={`parenthirs${this.props.id}`}>
                  {this.props.data.map((element, index) => {
                    if (
                      element.cohort === this.props.id &&
                      element.role === "HIR"
                    ) {
                      return (
                        <li key={index} className="hirs">
                          <Button
                            onClick={this.showProfile.bind(this)}
                            variant="outline-light"
                            block
                          >
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
                <Button variant="light" onClick={this.showStudents.bind(this)}>
                  Students
                </Button>
                <ul id={`parentstudents${this.props.id}`}>
                  {this.props.data.map((element, index) => {
                    if (
                      element.cohort === this.props.id &&
                      element.role === "Student"
                    ) {
                      return (
                        <li key={index} className="students">
                          <Button
                            onClick={this.showProfile.bind(this)}
                            variant="outline-light"
                            block
                          >
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
export default OneCohortButton;
