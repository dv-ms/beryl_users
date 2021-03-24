import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import NotFound from "./components/not_found";
import Users from "./components/users";
import NewUser from "./components/users/new";
import ShowUser from "./components/users/show";
import EditUser from "./components/users/edit";

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

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
