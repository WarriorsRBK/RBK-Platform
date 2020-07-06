import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import TableCompoStudent from "./TableCompoStudent.jsx";
class PinBoardStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohort: [],
      cohorts: [],
      validity: false,
    };
  }
  async componentWillMount() {
    let data = await axios.get("/UsersAndPins");
    this.setState({ usersAndPins: data.data });
    let cohorts = await axios.get("/CohortData");
    this.setState({ cohorts: cohorts.data });
  }

  showTable() {
    let cohort = $("#select").val();
    ReactDOM.render(
      <TableCompoStudent cohort={cohort} />,
      document.getElementById("tablee")
    );
  }

  render() {
    return (
      <div id="boardContain">
        <center>
          <select id="select">
            {this.state.cohorts.map((element, index) => {
              return (
                <option key={index} className="options">
                  {element.cohortNumber}
                </option>
              );
            })}
          </select>
          <button onClick={this.showTable.bind(this)}>Select Table</button>
          <div id="tablee"></div>
        </center>
      </div>
    );
  }
}
export default PinBoardStudent;
