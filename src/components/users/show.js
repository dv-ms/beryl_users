import React, { Component } from "react";
import { Alert, Image, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      error: null,
      user: {
        first_name: "",
        last_name: "",
        avatar: null,
        email: "",
      },
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {};

  render() {
    return (
      <>
        {this.state.error ? (
          <Alert variant="danger">{this.state.error.message}</Alert>
        ) : null}
        <div className={"p-3"}>
          <Link to={`${process.env.REACT_APP_HOME_PATH}`} className={"p-2"}>
            <Button variant="primary">Home</Button>
          </Link>
          <Link to={`${process.env.REACT_APP_USERS_PATH}`} className={"p-2"}>
            <Button variant="success">USERS</Button>
          </Link>
        </div>
        <div
          style={{
            padding: "20px",
            display: "inline-block",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <Form>
            <Form.Group controlId="formBasicFirstName" className={"m-3"}>
              <Form.Label>First Name</Form.Label>
              <Form.Label>{this.state.user.first_name}</Form.Label>
            </Form.Group>
          </Form>
        </div>
      </>
    );
  }
}
