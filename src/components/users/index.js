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
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.data != null) {
            console.log(response);
            this.setState({ users: response.data, error: null, loaded: true });
          } else {
            this.setState({
              loaded: true,
              error: response.message || "Error fetching Users",
            });
          }
        },
        (error) => {
          this.setState({
            loaded: true,
            error: error.message,
          });
        }
      );
  }
  render() {
    if (!this.state.loaded) {
      return (
        <>
          <Spinner animation="border" role="status"></Spinner>
          <p>Fetching ...</p>
        </>
      );
    } else if (this.state.error != null) {
      return <Alert variant="danger">{this.state.error.message}</Alert>;
    } else {
      return (
        <>
          <div style={{ padding: "20px" }}>
            <Link to="/" style={{ padding: "10px" }}>
              <Button variant="primary">Home</Button>
            </Link>
            <Link to="/users/new" style={{ padding: "10px" }}>
              <Button variant="success">Create new User</Button>
            </Link>
          </div>
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
                <tr style={{ align: "center" }}>
                  <td style={{ textAlign: "center" }}>{user.id}</td>
                  <td>
                    <Image src={user.avatar} roundedCircle />
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
