import logo from "./logo.svg";
import "./App.css";

import { Button } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home";
import NotFound from "./components/not_found";
import Users from "./components/users";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          {/* 
        <Route exact path="/users/new">
          <NewUser />
        </Route>
        <Route exact path="/users/new">
          <ShowUser />
        </Route>
        <Route exact path="/users/:userID">
          <ShowUser />
        </Route>
        <Route exact path="/users/:userID/edit">
          <EditUser />
        </Route>
        */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
