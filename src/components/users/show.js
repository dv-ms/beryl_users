import React, { Component } from "react";
import { Alert, Image, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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

  fetchUser = () => {
    let user_fetch_url = `${process.env.REACT_APP_USERS_LIST_URL}/${this.props.match.params.userID}`;

    fetch(user_fetch_url)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.data != null) {
            this.setState({
              loaded: true,
              error: null,
              user: response.data,
            });
          } else {
            this.setState({
              loaded: true,
              error: {
                message:
                  response.message == null
                    ? `${process.env.REACT_APP_USER_FETCH_ERROR}`
                    : response.message,
              },
            });
          }
        },
        (error) => {
          this.setState({
            loaded: true,
            error,
          });
        }
      );
  };

  render() {
    if (!this.state.loaded) {
      return (
        <>
          {/* Loader */}
          <Spinner animation="border" role="status"></Spinner>
          <p className={"m-2"}>Fetching ...</p>
        </>
      );
    } else {
      return (
        <>
          {/* Error alert */}
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
              <Form.Group controlId="userFormID" className={"m-3"}>
                <Form.Label>ID : </Form.Label>
                <Form.Label> {this.state.user.id}</Form.Label>
              </Form.Group>

              <Form.Group controlId="userFormFirstName" className={"m-3"}>
                <Form.Label>First Name : </Form.Label>
                <Form.Label> {this.state.user.first_name}</Form.Label>
              </Form.Group>

              <Form.Group controlId="userFormLastName" className={"m-3"}>
                <Form.Label>Last Name : </Form.Label>
                <Form.Label> {this.state.user.last_name}</Form.Label>
              </Form.Group>

              <Form.Group controlId="userFormAvatar" className={"m-3"}>
                <Form.Label>Avatar : </Form.Label>
                <Image
                  src={this.state.user.avatar}
                  roundedCircle
                  height={100}
                  width={100}
                />
              </Form.Group>

              <Form.Group controlId="userFormEmail" className={"m-3"}>
                <Form.Label>Email : </Form.Label>
                <Form.Label> {this.state.user.email}</Form.Label>
              </Form.Group>
            </Form>
          </div>
        </>
      );
    }
  }
}
