import React from "react";
import "./CohortButtonHIR.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import OneCohortButtonHIR from "../OneCohortButtonHIR/OneCohortButtonHIR.jsx";
import axios from "axios";
import $ from "jquery";
class CohortButtonHIR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cohorts: [],
      children: false,
    };
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
  async componentWillMount() {
    axios.get("/UserData").then((data) => {
      this.setState({ data: data.data });
    });
    let cohorts = await axios.get("/CohortData");
    this.setState({ cohorts: cohorts.data });
  }
  render() {
    return (
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
                  <OneCohortButtonHIR
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

      // <div>
      //   <ul>
      //     <li>
      //       <OneCohortButtonHIR id={this.state.cohort} data={this.state.data} />
      //     </li>
      //   </ul>
      // </div>
    );
  }
}
export default CohortButtonHIR;
