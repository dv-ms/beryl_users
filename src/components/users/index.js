import React, { Component } from "react";
import { Alert, Spinner, Table, Image, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
      users: [],
      show_user_id: null,
    };
  }
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch(`${process.env.REACT_APP_USERS_LIST_URL}`)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.data != null) {
            this.setState({ loaded: true, error: null, users: response.data });
          } else {
            this.setState({
              loaded: true,
              error: {
                message:
                  response.message == null
                    ? `${process.env.REACT_APP_USERS_FETCH_ERROR}`
                    : response.message,
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
  };

  deleteUser = (user_id) => {
    this.setState(
      {
        loaded: false,
      },
      () => {
        this.deleteUserAPI(user_id);
      }
    );
  };

  deleteUserAPI = (user_id) => {
    fetch(`${process.env.REACT_APP_USERS_LIST_URL}/${user_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(
        (success) => {
          alert("Deleted user");
          this.setState({ error: null, loaded: true });
          this.fetchUsers();
        },
        (error) => {
          this.setState({ error, loaded: true });
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
    } else if (this.state.error != null) {
      /* Error alert */
      return <Alert variant="danger">{this.state.error.message}</Alert>;
    } else if (this.state.show_user_id) {
      /* Show user */
      return (
        <Redirect
          to={`${process.env.REACT_APP_USERS_PATH}/${this.state.show_user_id}`}
        ></Redirect>
      );
    } else {
      return (
        <>
          {/* Buttons */}
          <div className={"p-3"}>
            <Link to={`${process.env.REACT_APP_HOME_PATH}`} className={"p-1"}>
              <Button variant="primary">Home</Button>
            </Link>
            <Link
              to={`${process.env.REACT_APP_NEW_USER_PATH}`}
              className={"p-1"}
            >
              <Button variant="success">Create new User</Button>
            </Link>
          </div>
          {/* Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={(e) => this.setState({ show_user_id: user.id })}
                >
                  <td>{user.id}</td>
                  <td>
                    <Image
                      src={user.avatar}
                      roundedCircle
                      height={100}
                      width={100}
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`${process.env.REACT_APP_USERS_PATH}/${user.id}/edit`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <span
                      style={{ cursor: "progress" }}
                      onClick={(e) => this.deleteUser(user.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    }
  }
}
