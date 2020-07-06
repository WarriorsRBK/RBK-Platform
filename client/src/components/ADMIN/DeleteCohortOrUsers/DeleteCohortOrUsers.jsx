import React from "react";
import "./DeleteCohortOrUsers.css";
import Axios from "axios";
class DeleteCohortOrUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohort: [],
      UserData: [],
    };
  }
  /**
   * @function componentDidUpdate that makes some css changes on some elements when ever the component  update
   */
  componentDidUpdate() {
    document.getElementById("Users").style.display = "none";
    document.getElementById("cohorts").style.display = "none";
    this.chooseCohortOrUser();
  }
  /**
   * @function componentWillMount that gets gets the userData and the cohortsData from the database
   */
  componentWillMount() {
    fetch("http://localhost:3000/CohortData")
      .then((res) => res.json())
      .then((cohort) => this.setState({ cohort }))
      .catch((err) => console.log(err));
    fetch("http://localhost:3000/UserData")
      .then((res) => res.json())
      .then((UserData) => this.setState({ UserData }))
      .catch((err) => console.log(err));
  }
  /**
   * @function chooseCohortOrUser that display which one the user choose and block the other one
   */
  chooseCohortOrUser() {
    // const input = document.getElementById("select").value;
    if (this.props.delete === "Cohort") {
      document.getElementById("ShowAndHide").style.display = "none";
      document.getElementById("cohorts").style.display = "block";
    } else {
      document.getElementById("ShowAndHide").style.display = "none";
      document.getElementById("Users").style.display = "block";
    }
  }
  /**
   * @function deleteUserFromDataBase that takes the userName from the input and deletes it from the dataBase
   */
  deleteUserFromDataBase() {
    const { UserData } = this.state;
    // console.log(UserData);
    var input = document.getElementById("UserNameInput").value.toLowerCase();
    for (var i = 0; i < UserData.length; i++) {
      if (UserData[i].fullName.toLowerCase() === input.toLowerCase()) {
        Axios.post("/DeleteUser", { input })
          .then(() => console.log("done!!"))
          .catch((err) => console.log(err));
        return;
      }
    }
    if (input === "") {
      alert("you need to enter a userName!!");
      return;
    } else {
      alert("this userName doesn't exist in the dataBase!!");
      document.getElementById("UserNameInput").value = "";
      return;
    }
  }
  /**
   * @function deleteCohortFromDataBase that takes the cohortNumber from the input and deletes it from the dataBase
   */
  deleteCohortFromDataBase() {
    var input = document.getElementById("selectCohortNumber").value;
    // console.log(input);
    Axios.post("/DeleteCohort", { input })
      //   .then(() => console.log("done!!"))
      .catch((err) => console.log(err));
    document.getElementById("selectCohortNumber").value = "";
  }

  render() {
    return (
      <div id="centerAll">
        <div id="cohorts">
          <div>
            <select id="selectCohortNumber">
              {this.state.cohort.map((elem, index) => {
                return <option key={index}>{elem.cohortNumber}</option>;
              })}
            </select>
            <br />
            <button onClick={this.deleteCohortFromDataBase.bind(this)}>
              Delete
            </button>
          </div>
        </div>
        <div id="Users">
          <div>
            <input id="UserNameInput" placeholder="UserFullName"></input>
            <br />
            <button onClick={this.deleteUserFromDataBase.bind(this)}>
              Delete
            </button>
          </div>
        </div>
        <div id="ShowAndHide">
          <div>Delete User or Cohort</div>
          <select id="select">
            <option>User</option>
            <option>Cohort</option>
          </select>
          <br />
          <button onClick={this.chooseCohortOrUser.bind(this)}>Next</button>
          <div className="YouChoose"></div>
        </div>
      </div>
    );
  }
}
export default DeleteCohortOrUsers;
