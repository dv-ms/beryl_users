import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to={`${process.env.REACT_APP_USERS_PATH}`}>
          <Button variant="success">USERS</Button>
        </Link>
      </div>
    );
  }
}
