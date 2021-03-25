import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      email: "eve.holt@reqres.in",
      email_error: null,
      password: "cityslicka",
      password_error: null,
    };
  }
  componentDidMount() {}

  setLogin = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  validateLogin = () => {
    let all_okay = true;
    if (
      this.state.email === "" ||
      this.state.email === null ||
      this.state.email === undefined ||
      this.notValidEmail()
    ) {
      this.setState({
        email_error: "Please enter valid email",
      });
      all_okay = false;
    }

    if (
      this.state.password === "" ||
      this.state.password === null ||
      this.state.password === undefined
    ) {
      this.setState({
        password_error: "Please enter valid password",
      });
      all_okay = false;
    }

    if (all_okay) {
      this.setState({
        email_error: null,
        password_error: null,
      });
    }

    return all_okay;
  };

  notValidEmail = () => {
    const email_regex = /\S+@\S+\.\S+/;
    return !email_regex.test(this.state.email);
  };

  Login = () => {
    let all_fine = this.validateLogin();
    if (all_fine) {
      this.setState(
        {
          loading: true,
        },
        () => {
          this.LoginAPI();
        }
      );
    }
  };

  LoginAPI = () => {
    fetch(`${process.env.REACT_APP_LOGIN_URL}`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then(
        (success) => {
          if (success.token != null) {
            alert("Login successfull");
            localStorage.setItem("users_auth_token", success.token);
            this.setState({
              loading: false,
              error: null,
            });
            // Reload will load App.js which will find auth_token in local storage and keep same page as user request
            window.location.reload();
          } else {
            this.setState({
              loading: false,
              error: {
                message: success.error,
              },
            });
          }
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );
  };

  render() {
    return (
      <>
        {/* Error alert */}
        {this.state.error ? (
          <Alert variant="danger">{this.state.error.message}</Alert>
        ) : null}
        {/* Form */}
        <div
          style={{
            padding: "20px",
            display: "inline-block",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <h3>Login</h3>
          <Form>
            <Form.Group controlId="loginFormEmail" className={"m-3"}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={this.state.email}
                required={true}
                type="email"
                placeholder="Please enter email"
                onChange={(e) => {
                  this.setLogin("email", e.target.value);
                  this.validateLogin();
                }}
              />
              {this.state.email_error ? (
                <span style={{ color: "red" }}>{this.state.email_error}</span>
              ) : null}
            </Form.Group>

            <Form.Group controlId="loginFormPassword" className={"m-3"}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                required={true}
                type="password"
                placeholder="Please enter password"
                onChange={(e) => {
                  this.setLogin("password", e.target.value);
                  this.validateLogin();
                }}
              />
              {this.state.password_error ? (
                <span style={{ color: "red" }}>
                  {this.state.password_error}
                </span>
              ) : null}
            </Form.Group>

            <Button
              variant="success"
              onClick={(e) => this.Login()}
              disabled={this.state.loading}
              className={"m-3"}
            >
              {this.state.loading ? "Please wait" : "Login"}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}
export default Login;
