import React from "react";
import axios from "axios";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./CalendarStudent.css";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBFormInline,
  MDBBtn,
} from "mdbreact";
class CalendarStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      colors: true,
      validity: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const todo = {
      value: $("#todoText").val(),
      startTime: $("#startTime").val(),
      endTime: $("#endTime").val(),
    };

    axios.post(`/calendar`, todo).then((res) => {
      this.setState({ todos: res.data });
      this.setState({ validity: !this.state.validity });
    });
    $("#todoText").val("");
    $("#startTime").val("");
    $("#endTime").val("");
    let data = await axios.get(`/calendar`);
    const reversedTodos = data.data.reverse();
    this.setState({ todos: reversedTodos });
  }

  componentWillMount() {
    fetch("/calendar")
      .then((res) => res.json())
      .then((todos) => {
        const reversedTodos = todos.reverse();
        this.setState({ todos: reversedTodos }, () =>
          console.log(this.state.todos)
        );
      });
  }

  deleteItem(id) {
    const todoos = this.state.todos.filter((todo) => {
      return todo["_id"] !== id;
    });
    this.setState({
      todos: todoos,
    });
    axios.delete(`/${id}`).then((res) => {
      // console.log(res);
      // console.log(res.data);
    });
  }
  componentDidUpdate() {
    $("#calendarBox").scrollTop($("#calendarBox")[0].scrollHeight);
    console.log("scrolled");
  }
  clearList() {
    // this.state.todos.map((todo) => {
    //   var todoID = todo["_id"];
    //   axios.delete(`${todoID}`).then((res) => {
    //     console.log("deleted all!");
    //   });
    // });
    // this.setState({
    //   todos: [],
    // });

    // axios.post(`/calendar`, { todo: [] }).then((res) => {
    //   // console.log(res);
    //   // console.log(res.data);
    // });
    axios.post("/DeleteCalendar");
  }
  async componentDidUpdate(prevState) {
    if (prevState.validity !== this.state.validity) {
      let data = await axios.get(`/calendar`);
      this.setState({ todos: data.data });
    }
    $("#todosID").scrollTop($("#todosID")[0].scrollHeight);
  }
  render() {
    // if (this.state.todos.length === 0) {
    //   $("#todosID").hide();
    // } else {
    //   $("#todosID").show();
    // }
    return (
      <div id="calendarBox2" style={{ textAlign: "center" }}>
        <label>
          <h1 style={{ marginTop: "25px" }}>
            <span style={{ color: "#0066ff" }}>Today's Calendar</span>
          </h1>
        </label>

        {this.state.todos.map((todo, i) => {
          return (
            <div
              className="listItemCalendar"
              key={i}
              style={{ textAlign: "center", position: "relative" }}
            >
              <MDBListGroupItem
                color="secondary"
                key={todo["_id"]}
                className="my-4 mx-4"
                style={{ listStyleType: "none" }}
                key={todo["_id"]}
              >
                <div>
                  from {todo.startTime} to {todo.endTime}
                </div>
                <div id="todoValuefor"> {todo.value}</div>

                <hr></hr>
              </MDBListGroupItem>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CalendarStudent;
