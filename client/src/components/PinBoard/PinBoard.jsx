import React from "react";
import axios from "axios";
class PinBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersAndPins: [],
    };
  }
  async componentWillMount() {
    let data = await axios.get("/UsersAndPins");
    console.log(data.data);
  }
  render() {
    return <div>Pin Board</div>;
  }
}
export default PinBoard;
