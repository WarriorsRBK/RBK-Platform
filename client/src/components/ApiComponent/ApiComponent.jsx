import React, { Component } from "react";
import Axios from "axios";
import Article from "./news.jsx";
import { MDBRow } from "mdbreact";
const API_KEY = "f8ffc4c995804f43804eff04416720b0";
export default class ApiComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }
  componentDidMount() {
    Axios.get(
      `http://newsapi.org/v2/everything?q=apple&from=2020-07-02&to=2020-07-02&sortBy=popularity&apiKey=${API_KEY}`
    ).then((res) => {
      console.log(res.data.articles);
      this.setState({ news: res.data.articles });
    });
  }
  render() {
    return (
      <div>
        <h1>News</h1>
        <MDBRow>
          {this.state.news.map((element, i) => {
            console.log(element);
            return <Article key={i} article={element} />;
          })}
        </MDBRow>
      </div>
    );
  }
}
