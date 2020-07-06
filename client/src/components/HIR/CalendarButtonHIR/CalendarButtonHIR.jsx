import React from "react";
import ReactDOM from "react-dom";
import "./CalendarButtonHIR.css";
import Button from "react-bootstrap/Button";
import Calendar from "../../ADMIN/Calendar/Calendar.jsx";
class CalendarButtonHIR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showPinBoard() {
    ReactDOM.render(<Calendar />, document.getElementById("interface"));
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
export default CalendarButtonHIR;
