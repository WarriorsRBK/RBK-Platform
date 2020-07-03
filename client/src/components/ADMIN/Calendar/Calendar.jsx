import React from "react";
import axios from "axios";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./Calendar.css";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBFormInline,
  MDBBtn,
} from "mdbreact";
class Calendar extends React.Component {
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
    };

    axios.post(`/calendar`, todo).then((res) => {
      this.setState({ todos: res.data });
      this.setState({ validity: !this.state.validity });
    });
    $("#todoText").val("");
    let data = await axios.get(`/calendar`);
    this.setState({ todos: data.data });
  }

  componentWillMount() {
    fetch("/calendar")
      .then((res) => res.json())
      .then((todos) =>
        this.setState({ todos }, () => console.log("todos here fetched", todos))
      );
  }

  deleteItem(id) {
    const todoos = this.state.todos.filter((todo) => {
      return todo["_id"] !== id;
    });
    this.setState({
      todos: todoos,
    });
    axios.delete(`/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  clearList() {
    this.state.todos.map((todo) => {
      var todoID = todo["_id"];
      axios.delete(`${todoID}`).then((res) => {
        console.log("deleted all!");
      });
    });
    this.setState({
      todos: [],
    });

    axios.post(`/calendar`, { todo: [] }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }
  // async componentDidUpdate(prevState) {
  //   if (prevState.validity !== this.state.validity) {
  //     let data = await axios.get(`/calendar`);
  //     this.setState({ todos: data.data });
  //   }
  // }
  render() {
    if (this.state.todos.length === 0) {
      $("#todosID").hide();
    } else {
      $("#todosID").show();
    }
    return (
      <div id="calendarBox" style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <label>
            <h1 style={{ marginTop: "25px" }}>
              <span style={{ color: "#0066ff" }}>Today's Calendar</span>
            </h1>
            <input
              id="todoText"
              className="form-control mr-sm-2"
              type="text"
              placeholder="Add to calendar..."
              aria-label="Add to calendar..."
              type="textarea"
              icon="pencil-alt"
              rows="2"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            placeholder="Add an event..."
            onClick={this.handleClick}
            className="btn btn-success"
          />
        </form>
        <ul
          style={{
            borderStyle: "solid",
            borderWidth: "5px",
            marginRight: "15%",
            marginLeft: "15%",
            borderRadius: "8px",
          }}
          className="rounded-sm"
          id="todosID"
        >
          {this.state.todos.map((todo, i) => {
            return (
              <div
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
                  {todo.value}
                  <button
                    className="btn btn-info btn-lg"
                    key={todo["_id"] + 100}
                  >
                    EDIT
                  </button>
                  <button
                    className="btn btn-danger"
                    key={todo["_id"]}
                    onClick={this.deleteItem.bind(this, todo["_id"])}
                  >
                    Delete
                  </button>

                  <hr></hr>
                </MDBListGroupItem>
              </div>
            );
          })}
        </ul>
        <button onClick={this.clearList}>Clear List</button>
      </div>
    );
  }
}

export default Calendar;
