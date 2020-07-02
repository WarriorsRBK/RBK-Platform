
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import React, { Component } from 'react';
import './Login.css';
import axios from 'axios'
class App extends Component {
  constructor(props){
    super(props)
  }
 
  componentWillMount(){
    axios.get("http://localhost:3000/UserData")
  }

  render() {
    return (
      <Container className="app">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email"  name="email" id="exampleEmail" placeholder="myemail@email.com"/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password"  id="examplePassword" placeholder="********" />            
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default App;