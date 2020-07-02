import React from "react";
import ReactDOM from "react-dom";
import "./DeleteButton.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import DeleteCohortOrUser from "../DeleteCohortOrUsers/DeleteCohortOrUsers.jsx";
class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: false,
    };
  }
  showChildren() {
    if (!this.state.children) {
      $("#deleteAccountItem").show(500);
      $("#deleteCohortItem").show(500);
      this.setState({ children: true });
    } else {
      $("#deleteAccountItem").hide(500);
      $("#deleteCohortItem").hide(500);
      this.setState({ children: false });
    }
  }
  showDeleteAccount() {
    ReactDOM.render(
      <DeleteCohortOrUser delete={"user"} />,
      document.getElementById("interface")
    );
  }
  showDeleteCohort() {
    ReactDOM.render(
      <DeleteCohortOrUser delete={"Cohort"} />,
      document.getElementById("interface")
    );
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="deleteButton"
              onClick={this.showChildren.bind(this)}
              block
            >
              Delete
            </Button>
            <ul>
              <li id="deleteAccountItem">
                <Button
                  onClick={this.showDeleteAccount.bind(this)}
                  variant="light"
                  id="deleteAccount"
                  size="sm"
                >
                  Delete Account
                </Button>
              </li>
              <li id="deleteCohortItem">
                <Button
                  onClick={this.showDeleteCohort.bind(this)}
                  variant="light"
                  id="deleteCohort"
                  size="sm"
                >
                  Delete Cohort
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
export default DeleteButton;
