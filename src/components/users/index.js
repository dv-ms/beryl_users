import React, { Component } from "react";
import { Alert, Spinner, Table, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
      users: [],
    };
  }
  componentDidMount() {
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
  }
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
    } else {
      return (
        <>
          {/* Buttons */}
          <div className={"p-3"}>
            <Link to={`${process.env.REACT_APP_HOME_PATH}`} className={"p-1"}>
              <Button variant="primary">Home</Button>
            </Link>
            <Link to={`${process.env.REACT_APP_NEW_USER_PATH}`} className={"p-1"}>
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
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => (
                <tr key={index}>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    }
  }
}
