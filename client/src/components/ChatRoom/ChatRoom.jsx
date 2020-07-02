import React, { Component } from "react";

import io from "socket.io-client";
import "./ChatRoom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const socket = io.connect("http://localhost:3000");

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      chat: [],
      name: localStorage.fullName,
      role: "HIR",
      curTime: new Date().toLocaleString(),
    };
  }

  componentDidMount() {
    socket.on("chat message", ({ name, role, message }) => {
      this.setState({
        chat: [...this.state.chat, { name, role, message }],
      });
    });
  }

  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = () => {
    const { name, message } = this.state;
    const role = localStorage.role;
    socket.emit("chat message", { name, role, message });
    this.setState({ message: "", curTime: new Date().toLocaleString() });
  };

  renderChat() {
    const chat = this.state.chat;
    return chat.map(({ name, role, message }, idx) => (
      <div
        key={idx}
        className="divMessage"
        style={{
          border: "2px solid #dedede",
          backgroundColor: "#ddd",
          borderRadius: "5px",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        <span>{role}</span>
        <span style={{ color: "green" }}> {name} : </span>

        <span style={{ color: "#999" }}>{message}</span>
        <span style={{ float: "right" }}>at: {this.state.curTime}</span>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>General chat</h1>
        </div>

        <div
          style={{
            overflowY: "scroll",
            border: "1px solid black",
            width: "600px",

            height: "550px",
            position: "relative",
            display: "block",
            margin: "0 auto",
          }}
        >
          {this.renderChat()}
        </div>
        <div style={{ textAlign: "center" }}>
          {/* <span>name</span>
          <input
            name="name"
            onChange={(e) => this.onTextChange(e)}
            value={this.state.name}
          /> */}

          {/* {localStorage.fullName} */}
          <div
            className="input-group mb-3"
            style={{ width: "55%", margin: "0 auto" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter a message..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="message"
              onChange={(e) => this.onTextChange(e)}
              value={this.state.message}
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={this.onMessageSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
