import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./PinBoard.css";
class TableCompo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersAndPins: [],
      validity: false,
    };
  }
  checkSort(data) {
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].cohort > data[i + 1].cohort) {
        return false;
      }
    }
    return true;
  }
  sortByDate(data) {
    if (!this.checkSort(data)) {
      while (!this.checkSort(data)) {
        for (let i = 0; i < data.length - 1; i++) {
          if (data[i].cohort > data[i + 1].cohort) {
            let temp = data[i];
            data[i] = data[i + 1];
            data[i + 1] = temp;
          }
        }
      }
    }
    return data;
  }
  async componentWillMount() {
    let data = await axios.get("/UsersAndPins");
    this.setState({ usersAndPins: data.data });
  }
  editPins(e) {
    let props = e.target.id.split(" ");
    let fullName = "";
    for (let i = 0; i < props.length; i++) {
      if (i !== props.length - 2 && i !== props.length - 1) {
        if (i !== props.length - 3) {
          fullName += props[i] + " ";
        } else {
          fullName += props[i];
        }
      }
    }
    let color = props[props.length - 2] + "Pins";
    let op = props[props.length - 1];
    axios.post("/EditPins", { fullName, color, op });
    this.setState({ validity: !this.state.validity });
  }
  async componentDidUpdate(prevState) {
    if (prevState.validity !== this.state.validity) {
      let data = await axios.get("/UsersAndPins");
      this.setState({ usersAndPins: data.data });
    }
  }
  render() {
    return (
      <div id="tableOfPins">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Cohort</th>
              <th>FullName</th>
              <th id="red">Red Pins</th>
              <th id="yellow">Yellow Pins</th>
              <th id="blue">Blue Pins</th>
            </tr>
          </thead>
          <tbody>
            {this.sortByDate(this.state.usersAndPins).map((element, index) => {
              if (element.cohort === Number(this.props.cohort)) {
                return (
                  <tr key={index}>
                    <td>Cohort: {element.cohort}</td>
                    <td>{element.fullName}</td>
                    <td>
                      <div className="left">{element.RedPins}</div>
                      <div className="right">
                        <ButtonGroup vertical>
                          <i
                            onClick={this.editPins.bind(this)}
                            id={`${element.fullName} Red Plus`}
                            className="fas fa-plus-square"
                          ></i>
                          <i
                            onClick={this.editPins.bind(this)}
                            id={`${element.fullName} Red Minus`}
                            className="fas fa-minus-square"
                          ></i>
                        </ButtonGroup>
                      </div>
                    </td>
                    <td>
                      <div className="left">{element.YellowPins}</div>
                      <div className="right">
                        <ButtonGroup vertical>
                          <i
                            onClick={this.editPins.bind(this)}
                            id={`${element.fullName} Yellow Plus`}
                            className="fas fa-plus-square"
                          ></i>
                          <i
                            onClick={this.editPins.bind(this)}
                            id={`${element.fullName} Yellow Minus`}
                            className="fas fa-minus-square"
                          ></i>
                        </ButtonGroup>
                      </div>
                    </td>
                    <td>
                      <div className="left">{element.BluePins}</div>
                      <div className="right">
                        <ButtonGroup vertical>
                          <i
                            onClick={this.editPins.bind(this)}
                            id={`${element.fullName} Blue Plus`}
                            className="fas fa-plus-square"
                          ></i>
                          <i
                            onClick={this.editPins.bind(this)}
                            id={`${element.fullName} Blue Minus`}
                            className="fas fa-minus-square"
                          ></i>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default TableCompo;
