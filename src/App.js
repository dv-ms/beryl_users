import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import NotFound from "./components/not_found";
import Users from "./components/users";
import NewUser from "./components/users/new";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={`${process.env.REACT_APP_HOME_PATH}`}>
            <Home />
          </Route>
          <Route exact path={`${process.env.REACT_APP_USERS_PATH}`}>
            <Users />
          </Route>
          <Route exact path={`${process.env.REACT_APP_NEW_USER_PATH}`}>
            <NewUser />
          </Route>
          {/* 
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
