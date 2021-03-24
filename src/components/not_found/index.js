import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <>
        <Link to="/">
          <Button variant="primary">Go to Home</Button>
        </Link>
        <div style={{ margin: "20px" }}>Not Found</div>
      </>
    );
  }
}
