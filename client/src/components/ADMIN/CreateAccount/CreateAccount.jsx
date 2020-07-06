import React, { Component } from "react";
import "./CreateAccount.css";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      CohortNumbers: [],
      UserData: [],
    };
  }
  /**
   * @function checkforUser that checks if the userName already exists in the dataBase
   * @param {newUserName} newUserName
   */
  checkforUser(newUserName) {
    const { data } = this.state;
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].fullName, newFullName);
      if (data[i].userName == newUserName) {
        alert("you need to enter a different fullName !!");
      }
    }
  }
  /**
   * @function submitNewUser that takes the data the Admin entered and creates a new account for
   *  that user with a generated password depending on some details
   */
  submitNewUser() {
    const { UserData } = this.state;

    // console.log(content);
    var data0 = document.getElementById("input0").value;
    var data1 = document.getElementById("input1").value.toLowerCase();
    var data2 = document.getElementById("input2").value;
    var data4 = document.getElementById("select1").value;
    var data5 = document.getElementById("select2").value;
    var data6 = document.getElementById("select3").value;
    if (data4 === "ADMIN") {
      var defaultPassword = "ADMINadmin";
    } else {
      var defaultPassword = "Cohort" + data5 + data4;
    }
    for (var i = 0; i < UserData.length; i++) {
      if (UserData[i].userName.toLowerCase() === data1.toLowerCase()) {
        alert("insert a new fullName pls!!");
        return;
      }
    }
    if (
      data0 === "" ||
      data1 === "" ||
      data2 === "" ||
      data4 === "" ||
      data5 === "" ||
      data6 === ""
    ) {
      alert("you need to fill the whole form!");
      return;
    } else {
      let obj = {
        fullName: data0,
        userName: data1,
        email: data2,
        password: defaultPassword,
        role: data4,
        cohort: data5,
        Gender: data6,
      };
      document.getElementById("UserInfo").innerText =
        "the User's password is " + defaultPassword;
      this.addDataToDataBase(obj);
      document.getElementById("input0").value = "";

      document.getElementById("input1").value = "";
      document.getElementById("input2").value = "";
      document.getElementById("select1").value = "";
      document.getElementById("select2").value = "";
      document.getElementById("select3").value = "";
    }
  }
  // checkForUserFullName() {
  //   const { UserData } = this.state;
  //   // console.log(UserData);
  //   var input1 = document.getElementById("input1").value;
  //   for (var i = 0; i < UserData.length; i++) {
  //     console.log(UserData[i].fullName.toLowerCase(), input1.toLowerCase());
  //     if (UserData[i].fullName.toLowerCase() === input1.toLowerCase()) {
  //       alert("insert a new fullName pls!!");
  //       break;
  //     }
  //   }
  // }
  /**
   * @function addDataToDataBase that takes the data entered by the admin and send a req to the server to add it to database
   * @param {obj} content containes the user data
   *
   */
  addDataToDataBase(content) {
    fetch("http://localhost:3000/UserCreation", {
      method: "post",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        return data.json();
      })
      // .then(() => console.log("done!!"))
      .catch((err) => console.log(err));
  }
  // getCohorts() {
  //   fetch("http://localhost:3000/CohortData")
  //     .then((res) => res.json())
  //     .then((CohortNumber) => this.setState({ CohortNumber }))
  //     .then(() => console.log(this.state.CohortNumber))
  //     .catch((err) => console.log(err));
  // }
  /**
   * @function componentWillMount that gets the userData and the cohortData from the dataBase and set it to  the state
   */
  componentWillMount() {
    fetch("http://localhost:3000/CohortData")
      .then((res) => res.json())
      .then((CohortNumbers) => this.setState({ CohortNumbers }))
      // .then(() => console.log("will", this.state.CohortNumbers))
      .catch((err) => console.log(err));
    fetch("http://localhost:3000/UserData")
      .then((res) => res.json())
      .then((UserData) => this.setState({ UserData }))
      // .then(() => console.log(this.state.data))
      .catch((err) => console.log(err));
  }
  render() {
    // console.log(this.state.CohortNumbers);
    return (
      <div id="outer">
        <div id="formContainer">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="formLabels">FullName</Form.Label>
                <Form.Control id="input0" type="text" placeholder="FullName" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="formLabels">UserName</Form.Label>
                <Form.Control id="input1" type="text" placeholder="UserName" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="formLabels">Email</Form.Label>
                <Form.Control
                  id="input2"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="formLabels">Cohorts</Form.Label>
                <Form.Control id="select2" as="select">
                  {this.state.CohortNumbers.map((elem, index) => {
                    return <option key={index}>{elem.cohortNumber}</option>;
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="formLabels">Role</Form.Label>
                <Form.Control id="select1" as="select">
                  <option>HIR</option>
                  <option>Student</option>
                  <option>ADMIN</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="formLabels">Gender</Form.Label>
                <Form.Control id="select3" as="select">
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button
              id="submitButton"
              onClick={this.submitNewUser.bind(this)}
              variant="primary"
            >
              Submit
            </Button>
          </Form>
        </div>
        <div id="UserInfo"></div>
      </div>
      // <div className="any">
      //   <input id="input1" type="text" placeholder="fullName"></input>
      //   <input id="input2" type="text" placeholder="email"></input>
      //   <select id="select1">
      //     Role
      //     <option>HIR </option>
      //     <option>Student</option>
      //     <option>Admin</option>
      //   </select>
      //   <select id="select2">
      //     Cohort
      //     {this.state.CohortNumbers.map((elem, index) => {
      //       return <option key={index}>{elem.cohortNumber}</option>;
      //       // console.log(elem);
      //     })}
      //   </select>
      //   <select id="select3">
      //     Gender
      //     <option>Male </option>
      //     <option>Female</option>
      //   </select>
      //   <button id="submitButton" onClick={this.submitNewUser.bind(this)}>
      //     Create
      //   </button>
      //   <div id="UserInfo"></div>
      // </div>
    );
  }
}
export default CreateAccount;
