import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
class TableCompoStudent extends React.Component {
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
              <th>Blue Pins</th>
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
                        <ButtonGroup vertical></ButtonGroup>
                      </div>
                    </td>
                    <td>
                      <div className="left">{element.YellowPins}</div>
                      <div className="right">
                        <ButtonGroup vertical></ButtonGroup>
                      </div>
                    </td>
                    <td>
                      <div className="left">{element.BluePins}</div>
                      <div className="right">
                        <ButtonGroup vertical></ButtonGroup>
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
export default TableCompoStudent;
