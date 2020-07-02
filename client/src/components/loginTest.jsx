import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

class LoginTest extends React.Component {
  constructor() {
    super();

    this.state = {
      CohortNumbers: [],
      UserData: [],
    };
  }
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
  loginButton() {
    // console.Log("clicked");
    const fullNameTest = document.getElementById("input1").value;
    const passwordTest = document.getElementById("input2").value;
    const { UserData } = this.state;
    for (var i = 0; i < UserData.length; i++) {
      if (
        fullNameTest === UserData[i].fullName
        // && passwordTest === UserData[i].password
      ) {
        const obj = {};
        const role = UserData[i].role;
        obj["fullName"] = fullNameTest;
        obj["loginPassword"] = passwordTest;
        obj["role"] = role;
        obj["hashedPassword"] = UserData[i].password;
        localStorage.setItem("fullName", fullNameTest);
        localStorage.setItem("role", role);
        fetch("http://localhost:3000/loginTest", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((data) => {
            data.json();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  render() {
    return (
      <div>
        <input id="input1" placeholder="fullName"></input>
        <input id="input2" placeholder="password"></input>
        <button onClick={this.loginButton.bind(this)}>Login</button>
      </div>
    );
  }
}
export default LoginTest;
