import React from "react";
import "./CreateButton.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import CreateCohort from "../CreateCohort/CreateCohort.jsx";
import CreateAccount from "../CreateAccount/CreateAccount.jsx";
import ReactDOM from "react-dom";
class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: false,
    };
  }
  showChildren() {
    if (!this.state.children) {
      $("#createAccountItem").show(500);
      $("#createCohortItem").show(500);
      this.setState({ children: true });
    } else {
      $("#createAccountItem").hide(500);
      $("#createCohortItem").hide(500);
      this.setState({ children: false });
    }
  }
  openAccount() {
    ReactDOM.render(<CreateAccount />, document.getElementById("interface"));
  }
  openCohort() {
    ReactDOM.render(<CreateCohort />, document.getElementById("interface"));
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="createButton"
              onClick={this.showChildren.bind(this)}
              block
            >
              Create
            </Button>
            <ul>
              <li id="createAccountItem">
                <Button
                  onClick={this.openAccount.bind(this)}
                  variant="light"
                  id="createAccount"
                  size="sm"
                >
                  Create Account
                </Button>
              </li>
              <li id="createCohortItem">
                <Button
                  onClick={this.openCohort.bind(this)}
                  variant="light"
                  id="createCohort"
                  size="sm"
                >
                  Create Cohort
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
export default CreateButton;
