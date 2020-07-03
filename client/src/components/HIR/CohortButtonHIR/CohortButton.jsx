import React from "react";
import "./CohortButton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import OneCohortButton from "../OneCohortButton/OneCohortButton.jsx";
import axios from "axios";
import $ from "jquery";
class CohortButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cohort: 1,
    };
  }
  async componentWillMount() {
    await axios.get("/UserData").then((data) => {
      this.setState({ data: data.data });
    });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <OneCohortButton id={this.state.cohort} data={this.state.data} />
          </li>
        </ul>
      </div>
    );
  }
}
export default CohortButton;
