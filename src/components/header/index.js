import React, { Component } from "react";
import { Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("HEADER MOUNT function");
  }
  componentDidUpdate() {}

  logout = () => {
    localStorage.removeItem("users_auth_token");
    alert("Logged out successfully");

    window.location.href = "/";
  };
  render() {
    console.log("Header render");
    return (
      <div id="header">
        <Row>
          <Col xs={1}>
            <h4>Assignment</h4>
          </Col>
          <Col xs={10} />
          <Col xs={1}>
            <Link to="/upload">
              <Button variant="primary">Upload</Button>
            </Link>
            <Button variant="danger" onClick={(e) => this.logout()}>
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  componentWillUnmount() {}
}
