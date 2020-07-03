import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Login.css";
import axios from "axios";
import $ from "jquery";
import App from "../App/App.jsx";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      acceptance: null,
    };
  }

  async componentDidMount() {
    let data = await axios.get("/UserData");
    this.setState({ data: data.data });
  }
  async checkUser() {
    let userName = $("#exampleEmail").val();
    let password = $("#examplePassword").val();
    let result = await axios.post("/CheckUser", { userName, password });

    console.log(result);
    this.setState({ acceptance: result.data });
    console.log(this.state.acceptance);
    if (result.data[0]) {
      localStorage.setItem("fullName", result.data[1]);
      localStorage.setItem("role", result.data[2]);
      console.log(localStorage.fullName);
      location.reload();
    }
    if (!result.data[0]) {
      $("#errorMessage").text("Invalid Username Or Password!");
      $("#examplePassword").val("");
    }
    // ReactDOM.render(<App />, document.getElementById("app"));
  }
  render() {
    return (
      <Container className="formm">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>userName</Label>
              <Input
                type="text"
                name="userName"
                id="exampleEmail"
                placeholder="userName"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <p id="errorMessage"></p>
          <Button onClick={this.checkUser.bind(this)}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
