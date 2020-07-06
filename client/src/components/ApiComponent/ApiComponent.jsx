import React, { Component } from "react";
import Axios from "axios";
import Article from "./news.jsx";
import { MDBRow } from "mdbreact";
const API_KEY = "b80497e330444f5c936ac85b26bf8827";
export default class ApiComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }
  /**
   * @function componentDidMount that gets the data back from the server from  an other API and set that data to the state
   */
  async componentDidMount() {
    let data = await Axios.get("/getAPI");
    this.setState({ news: data.data });
  }
  render() {
    return (
      <div>
        <h1>News</h1>
        <MDBRow>
          {this.state.news.map((element, i) => {
            return <Article key={i} article={element} />;
          })}
        </MDBRow>
      </div>
    );
  }
}
