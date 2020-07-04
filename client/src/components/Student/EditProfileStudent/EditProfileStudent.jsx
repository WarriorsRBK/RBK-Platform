import React from "react";
import "./EditProfileStudent.css";
import axios from "axios";
import $ from "jquery";
import { Button } from "react-bootstrap";
class EditProfileStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      user: "",
    };
  }
  async componentWillMount() {
    let fullName = this.props.fullName;
    let data = await axios.post("/GetUser", { fullName });
    this.setState({ data: data.data });
  }
  saveChanges() {
    let elements = $(".inputs");
    let obj = {};
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value) {
        obj[elements[i].id] = elements[i].value;
      }
    }
    let fullName = this.state.data.fullName;
    axios.post("/updateUser", { obj, fullName });
    $("#myModal").css("display", "none");
    $("#profilecontainer").css("filter", "");
    $("#profilecontainer").css("-webkit-filter", "");
  }
  render() {
    return (
      <div className="profileToEdit" sm="10">
        <div className="profileInputs">
          <label>FullName: </label>
          <input
            className="inputs"
            type="text"
            id="fullName"
            placeholder={`${this.state.data.fullName}`}
          />
          <br />
          <label>Gender: </label>
          <input
            className="inputs"
            type="text"
            id="Gender"
            placeholder={`${this.state.data.Gender}`}
          />
          <br />
          <label>Cohort: </label>
          <input
            className="inputs"
            type="text"
            disabled
            placeholder={`${this.state.data.cohort}`}
          />
          <br />
          <label> Role: </label>
          <input
            className="inputs"
            type="text"
            disabled
            placeholder={`${this.state.data.role}`}
          />
          <br />
          <label> E-mail: </label>
          <input
            className="inputs"
            type="text"
            id="email"
            placeholder={`${this.state.data.email}`}
          />
          <br />
          <label> Password: </label>
          <input
            className="inputs"
            type="text"
            id="password"
            placeholder={`${this.state.data.password}`}
          />
        </div>
        <Button
          onClick={this.saveChanges.bind(this)}
          id="saveButton"
          variant="outline-light"
        >
          Save
        </Button>
      </div>
    );
  }
}
export default EditProfileStudent;
