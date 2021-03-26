import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import NotFound from "./components/not_found";
import { Spinner } from "react-bootstrap";
import Login from "./components/login";
import Upload from "./components/upload";
import Upload2 from "./components/upload2";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      logged_in: false,
    };
  }
  componentDidMount() {
    this.CheckLoginStatus();
  }

  CheckLoginStatus = () => {
    let auth_token = localStorage.getItem("users_auth_token");
    if (auth_token === null || auth_token === undefined) {
      this.setState({
        loading: false,
        error: { message: "Not logged in" },
        logged_in: false,
      });
    } else {
      this.setState({
        loading: false,
        error: null,
        logged_in: true,
      });
    }
  };

  render() {
    console.log("App rendered");
    if (this.state.loading) {
      return (
        <>
          <Spinner animation="border" />
          <span>Loading ...</span>
        </>
      );
    } else {
      return (
        <div className="App">
          {this.state.logged_in ? (
            <Router>
              <Switch>
                <Route exact path={`${process.env.REACT_APP_HOME_PATH}`}>
                  <Dashboard />
                </Route>

                <Route exact path={`${process.env.REACT_APP_UPLOAD_PATH}`}>
                  <Upload />
                </Route>

                <Route exact path={`${process.env.REACT_APP_UPLOAD_2_PATH}`}>
                  <Upload2 />
                </Route>

                {/* 
                <Route exact path={`${process.env.REACT_APP_USERS_PATH}`}>
                  <Users />
                </Route>

                <Route exact path={`${process.env.REACT_APP_NEW_USER_PATH}`}>
                  <NewUser />
                </Route>

                <Route
                  exact
                  path={`${process.env.REACT_APP_USERS_PATH}/:userID`}
                  render={(props) => <ShowUser {...props} />}
                />

                <Route
                  exact
                  path={`${process.env.REACT_APP_USERS_PATH}/:userID/edit`}
                  render={(props) => <EditUser {...props} />}
                />
                */}

                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          ) : (
            <Login />
          )}
        </div>
      );
    }
  }
}

export default App;
