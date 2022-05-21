import logo from "./logo.svg";
import "./App.css";
//import react router dom
import { Switch, Route, BrowserRouter } from "react-router-dom";

//import component Register
import Register from "./pages/Register";

//import component Login
import Login from "./pages/Login";

//import component Register
import Dashboard from "./pages/Dashboard";

import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signout from "./pages/Signout";
import NotFound from "./pages/NotFound";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import withPageView from "./withPageView";

library.add(fab, faCheckSquare, faCoffee);
class Header extends React.Component {
  render() {
    return <div>INI HEADER</div>;
  }
}

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={withPageView(Login)} />
          <Route exact path="/signout" component={withPageView(Signout)} />
          <ProtectedRoutes
            exact
            path="/dashboard"
            component={withPageView(Dashboard)}
          />
          <Route component={withPageView(NotFound)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
