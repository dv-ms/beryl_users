import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/users">
          <Button variant="success">USERS</Button>
        </Link>
      </div>
    );
  }
}
