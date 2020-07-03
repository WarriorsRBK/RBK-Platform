import React from "react";
import "./CohortsButton.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import OneCohortButton from "../OneCohortButton/OneCohortButton.jsx";
import axios from "axios";
class CohortsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: false,
      cohorts: [],
      data: [],
    };
  }
  componentWillMount() {
    axios.get("/CohortData").then((data) => {
      this.setState({ cohorts: data.data });
    });
    axios.get("/UserData").then((data) => {
      this.setState({ data: data.data });
    });
  }
  showChildren() {
    if (!this.state.children) {
      $(".cohortsItems").show(500);
      this.setState({ children: true });
    } else {
      $(".cohortsItems").hide(500);
      this.setState({ children: false });
    }
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="cohortsButton"
              onClick={this.showChildren.bind(this)}
              block
            >
              Cohorts
            </Button>
            <ul>
              {this.state.cohorts.map((element, index) => {
                return (
                  <li className="cohortsItems" key={index}>
                    <OneCohortButton
                      visibility={this.state.children}
                      data={this.state.data}
                      id={element.cohortNumber}
                    />
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
export default CohortsButton;
