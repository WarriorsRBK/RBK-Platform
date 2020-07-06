import React, { Component } from "react";
import $ from "jquery";
class PinnedBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohortNumbers: [],
      userData: [],
      filter: 1,
      value: null,
      users: [],
      query: "",
    };
    // this.fetchStudents = this.fetchStudents.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
    this.renderStudents = this.renderStudents.bind(this)
  }
  getData = () => {
    fetch("http://localhost:3000/CohortData")
      .then((res) => res.json())
      .then((cohortNumbers) => this.setState({ cohortNumbers }))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/UserData")
      .then((res) => res.json())
      .then((userData) => this.setState({ userData }))
      .catch((err) => console.log(err));
  };
  componentWillMount() {
    this.getData();
  }
  renderStudents() {
    
  }

  render() {
    return (
      <div>
        <h1>Pinned-Board</h1>
        <nav className="navbar navbar-light bg-light" style={{ width: "47%" }}>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={this.renderStudents}
            >
              Search
            </button>
          </form>
        </nav>
      </div>
    );
  }
}

export default PinnedBoard;

//   fetchStudents() {
//     var value = Number($("#cohortNumber").val());
//     // console.log(value);

//     this.state.userData
//       .filter((user) => {
//         return user.cohort === value;
//       })
//       .map((user, i) => {
//         // <li key={i}>{user.fullName}</li>
//         this.state.users.push(user);
//       });
//     console.log('users:',this.state.users);
//   }
//   renderUsers() {
//     return this.state.users.map((user, i) => {
//       <li key={i}>{user}</li>;
//     });
//   }
