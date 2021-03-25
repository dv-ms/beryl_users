import React, { Component } from "react";

import Users from "../users";
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate() {}
  renderBody = () => {
    switch (this.props.page) {
      case 0:
        // users
        return <Users />;

      case 1:
        // profile
        return <h1>{this.props.pages[1].name}</h1>;

      default:
        break;
    }
  };
  render() {
    console.log("Body rendered");
    return <div>{this.renderBody()}</div>;
  }
  componentWillUnmount() {}
}
