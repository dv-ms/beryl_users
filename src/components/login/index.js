import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
  }
  componentDidMount() {}

  setLogin = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  validateLogin = () => {
    switch (true) {
      case this.state.email === "" ||
        this.state.email === null ||
        this.state.email === undefined ||
        this.notValidEmail():
        this.setState({
          error: {
            message: "Please enter valid email",
          },
        });
        return false;

      case this.state.password === "" ||
        this.state.password === null ||
        this.state.password === undefined:
        this.setState({
          error: {
            message: "Please enter valid password",
          },
        });
        return false;

      default:
        return true;
    }
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
    console.log(this.state.email);
    console.log(this.state.password);
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
                onChange={(e) => this.setLogin("email", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="loginFormPassword" className={"m-3"}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                required={true}
                type="password"
                placeholder="Please enter password"
                onChange={(e) => this.setLogin("password", e.target.value)}
              />
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
