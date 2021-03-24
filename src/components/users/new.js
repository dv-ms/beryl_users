import React, { Component } from "react";
import { Alert, Image, Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default class NewUser extends Component {
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
        job: "",
      },
      user_avatar_preview: "",
      user_created: false,
    };
  }

  setUser = (key, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [key]: value,
      },
    });
  };

  validateUser = () => {
    for (let key in this.state.user) {
      if (this.state.user[key] === "" || this.state.user[key] === null) {
        this.setState({
          error: {
            message: "Please enter " + key.toUpperCase().replace("_", " "),
          },
        });
        return false;
      }
    }
    this.setState({
      error: null,
    });
    return true;
  };

  createUser() {
    let all_fine = this.validateUser();
    if (all_fine) {
      this.setState(
        {
          loaded: false,
        },
        () => {
          this.createUserAPI();
        }
      );
    } else {
      // to show error message on top
      window.scrollTo(0, 0);
    }
  }
  createUserAPI = () => {
    fetch(`${process.env.REACT_APP_USERS_LIST_URL}`, {
      method: "POST",
      body: {
        // using just names and job here because API only accepts name and job
        name: this.state.user.first_name + " " + this.state.user.last_name,
        job: this.state.user.job,
      },
    })
      .then((response) => response.json())
      .then(
        (success) => {
          if (success.id != null) {
            // user is saved at back-end
            alert("User created");
            this.setState({
              loaded: true,
              error: null,
              user_created: true,
            });
          } else {
            this.setState({
              loaded: true,
              error: {
                message: "Error creating user: " + success.message,
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
    return (
      <>
        {/* Redirect if user is created */}
        {this.state.user_created ? (
          <Redirect to={`${process.env.REACT_APP_USERS_PATH}`} />
        ) : null}
        {/* Error alert */}
        {this.state.error ? (
          <Alert variant="danger">{this.state.error.message}</Alert>
        ) : null}
        {/* Buttons */}
        <div className={"p-3"}>
          <Link to={`${process.env.REACT_APP_HOME_PATH}`} className={"p-2"}>
            <Button variant="primary">Home</Button>
          </Link>
          <Link to={`${process.env.REACT_APP_USERS_PATH}`} className={"p-2"}>
            <Button variant="success">USERS</Button>
          </Link>
        </div>
        {/* Form */}
        <div
          style={{
            padding: "20px",
            display: "inline-block",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <Form>
            <Form.Group controlId="userFormFirstName" className={"m-3"}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required={true}
                type="text"
                placeholder="Please enter first name"
                onKeyUp={(e) => this.setUser("first_name", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="userFormLastName" className={"m-3"}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required={true}
                type="text"
                placeholder="Please enter last name"
                onKeyUp={(e) => this.setUser("last_name", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="userFormAvatar" className={"m-3"}>
              <Form.File
                required={true}
                id="userFormAvatar"
                label="Avatar"
                onChange={(e) => {
                  this.setUser("avatar", e.target.files[0]);
                  this.setState({
                    user_avatar_preview: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />
              {this.state.user_avatar_preview ? (
                <Image
                  src={this.state.user_avatar_preview}
                  roundedCircle
                  height={100}
                  width={100}
                />
              ) : null}
            </Form.Group>

            <Form.Group controlId="userFormEmail" className={"m-3"}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required={true}
                type="email"
                placeholder="Please enter email"
                onKeyUp={(e) => this.setUser("email", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="userFormJob" className={"m-3"}>
              <Form.Label>Job</Form.Label>
              <Form.Control
                required={true}
                type="text"
                placeholder="Please enter Job"
                onKeyUp={(e) => this.setUser("job", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="success"
              onClick={(e) => this.createUser()}
              disabled={!this.state.loaded}
              className={"m-3"}
            >
              {this.state.loaded ? "Create" : "Please wait"}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}
