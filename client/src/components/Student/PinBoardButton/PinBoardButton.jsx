import React from "react";
import ReactDOM from "react-dom";
import "./PinBoardButton.css";
import Button from "react-bootstrap/Button";
import PinBoardStudent from "../PinBoardStudent/PinBoardStudent.jsx";
class PinBoardButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showPinBoard() {
    ReactDOM.render(<PinBoardStudent />, document.getElementById("interface"));
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Button
              variant="outline-light"
              id="PinBoardButton"
              onClick={this.showPinBoard.bind(this)}
              block
            >
              Pin Board
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
export default PinBoardButton;
