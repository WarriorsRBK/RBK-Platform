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
import "./Login.css";
import axios from "axios";
import $ from "jquery";
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
    let email = $("#exampleEmail").val();
    let password = $("#examplePassword").val();
    let result = await axios.post("/CheckUser", { email, password });
    this.setState({ acceptance: result.data });
    console.log(this.state.acceptance);
    if (!this.state.acceptance) {
      $("#errorMessage").text("Invalid Username Or Password!");
    }
  }
  render() {
    return (
      <Container className="app">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
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
