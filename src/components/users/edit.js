import React, { Component } from "react";
import { Alert, Image, Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default class EditUser extends Component {
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
        job: "",
      },
      user_avatar_preview: "",
      user_updated: false,
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
            let temp_user = response.data;
            temp_user["job"] = "Manager";
            this.setState({
              loaded: true,
              error: null,
              user: temp_user,
              user_avatar_preview: response.data.avatar,
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
            error: {
              message: error.message,
            },
          });
        }
      );
  };

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

  updateUser() {
    let all_fine = this.validateUser();
    if (all_fine) {
      this.setState(
        {
          loaded: false,
        },
        () => {
          let user_update_url = `${process.env.REACT_APP_USERS_LIST_URL}/${this.props.match.params.userID}`;
          fetch(user_update_url, {
            method: "PUT",
            body: {
              // using just names and job here because API only accepts name and job
              name:
                this.state.user.first_name + " " + this.state.user.last_name,
              job: this.state.user.job,
            },
          })
            .then((response) => response.json())
            .then(
              (success) => {
                if (success.updatedAt != null) {
                  // user is updated at back-end
                  this.setState({
                    loaded: true,
                    error: null,
                    user_updated: true,
                  });
                } else {
                  this.setState({
                    loaded: true,
                    error: {
                      message: "Error updating user: " + success.message,
                    },
                  });
                }
              },
              (error) => {
                this.setState({
                  loaded: true,
                  error: { message: error.message },
                });
              }
            );
        }
      );
    } else {
      // to show error message on top
      window.scrollTo(0, 0);
    }
  }
  render() {
    return (
      <>
        {this.state.user_updated ? (
          <Redirect to={`${process.env.REACT_APP_USERS_PATH}`} />
        ) : null}
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
              <Form.Control
                value={this.state.user.first_name}
                required={true}
                type="text"
                placeholder="Please enter first name"
                onChange={(e) => this.setUser("first_name", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className={"m-3"}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={this.state.user.last_name}
                required={true}
                type="text"
                placeholder="Please enter last name"
                onChange={(e) => this.setUser("last_name", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAvatar" className={"m-3"}>
              <Form.File
                required={true}
                id="formBasicAvatar"
                label="Avatar"
                onChange={(e) => {
                  this.setUser("avatar", e.target.files[0]);
                  this.setState({
                    user_avatar_preview: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />

              <Image
                src={this.state.user_avatar_preview}
                roundedCircle
                height={100}
                width={100}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className={"m-3"}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={this.state.user.email}
                required={true}
                type="email"
                placeholder="Please enter email"
                onChange={(e) => this.setUser("email", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicJob" className={"m-3"}>
              <Form.Label>Job</Form.Label>
              <Form.Control
                value={this.state.user.job}
                required={true}
                type="text"
                placeholder="Please enter Job"
                onChange={(e) => this.setUser("job", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="success"
              onClick={(e) => this.updateUser()}
              disabled={!this.state.loaded}
              className={"m-3"}
            >
              {this.state.loaded ? "Update" : "Please wait"}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}
