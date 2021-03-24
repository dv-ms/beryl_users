import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <>
        <Link to={`${process.env.REACT_APP_HOME_PATH}`}>
          <Button variant="primary">Go to Home</Button>
        </Link>
        <div className={"m-3"}>Not Found</div>
      </>
    );
  }
}
