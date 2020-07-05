import React from "react";
import ReactDOM from "react-dom";
import "./CalendarButtonStudent.css";
import Button from "react-bootstrap/Button";
import CalendarStudent from "../CalendarStudent/CalendarStudent.jsx";
class CalendarButtonStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showPinBoard() {
    ReactDOM.render(<CalendarStudent />, document.getElementById("interface"));
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="CalendarButton"
              onClick={this.showPinBoard.bind(this)}
              block
            >
              Calendar
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
export default CalendarButtonStudent;
