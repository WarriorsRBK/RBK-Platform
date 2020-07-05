import React from "react";
import "./CohortButtonStudent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import OneCohortButtonStudent from "../OneCohortButtonStudent/OneCohortButtonStudent.jsx";
import axios from "axios";
import $, { data } from "jquery";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
class CohortButtonStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cohort: null,
    };
  }
  async componentWillMount() {
    let data = await axios.get("/UserData");
    this.setState({ data: data.data });
    let current = await axios.post("/GetUser", {
      fullName: localStorage.fullName,
    });
    this.setState({ cohort: current.data.cohort });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <OneCohortButtonStudent
              id={this.state.cohort}
              data={this.state.data}
            />
          </li>
        </ul>
      </div>
    );
  }
}
export default CohortButtonStudent;
