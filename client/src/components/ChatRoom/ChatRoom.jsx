import React, { Component } from "react";

import io from "socket.io-client";
import "./ChatRoom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import $ from 'jquery'
const socket = io.connect("http://localhost:3000");



class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      chat: [],
      name: localStorage.fullName,
      role: "HIR",
      createdAt: "",
     
    };
  }
  /**
   * @function componentDidMount that uses socket to set the new messages to the state
   */
  componentDidMount() {
    socket.on("chat message", ({ name, role, message, createdAt }) => {
      this.setState({
        chat: [...this.state.chat, { name, role, message, createdAt }],
      });
    });
    
  }
  /**
   * @function componentWillMount that gets the data from  the database and set it to the state
   */
  componentWillMount() {
    fetch("http://localhost:3000/chatRoomData")
      .then((res) => res.json())
      .then((chat) => this.setState({ chat }))
      // .then(() => console.log(this.state.data))
      .catch((err) => console.log(err));
  }
  /**
   * @function onTextChange that takes an obj containing the sender and the msg and set it to the state along with the date
   * @param {obj} e
   */
  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ createdAt: new Date().toLocaleString() });
    socket.on("typing", function (data) {
      $('.typing').text =
        "<p><em>" + data + " is typing a message...</em></p>";
    });
  };
  /**
   * @function onMessageSubmit that depends on a click it takes the user input along with his name and date and send it to
   * the chat using socket
   */
  onMessageSubmit = () => {
    const { name, message, createdAt } = this.state;
    const role = localStorage.role;
    socket.emit("chat message", { name, role, message, createdAt });
    this.setState({ message: "" });
  };
  /**
   * @function componentDidUpdate some jquery animation that scrolls to the last added msg
   */
  componentDidUpdate() {
    $("#chatBoxRoom").scrollTop($("#chatBoxRoom")[0].scrollHeight);
    
  }
  /**
   * @function checkRole that cheks for the user in order to send a different msg with a different color
   * @param {string} name
   * @param {string} role
   */
  checkRole(name, role) {
    if (role === "ADMIN") {
      return <span style={{ color: "red" }}> {name} : </span>;
    } else if (role === "HIR") {
      return <span style={{ color: "blue" }}> {name} : </span>;
    } else {
      return <span style={{ color: "green" }}> {name} : </span>;
    }
  }
  /**
   * @function renderChat that renders the new added msgs along with the old msgs
   */
  renderChat() {
    const chat = this.state.chat;
    return chat.map(({ name, role, message, createdAt }, idx) => (
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
        {this.checkRole(name, role)}
        <span style={{ color: "#999" }}>{message}</span>
        <span style={{ float: "right" }}>at: {createdAt}</span>
      </div>
    ));
  }


  
  render() {
    return (
      <div id="chatContain">
        <div style={{ textAlign: "center" }}>
          <h1>General chat</h1>
        </div>

        <div
          id="chatBoxRoom"
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
        <div className='typing'></div>
      </div>
    );
  }
}

export default Chat;
