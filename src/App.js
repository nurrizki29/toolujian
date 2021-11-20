import logo from './logo.svg';
import './App.css';
//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

//import component Register
import Dashboard from './pages/Dashboard';

import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import ProtectedRoutes from './components/ProtectedRoutes';
import Signout from './pages/Signout';

class Header extends React.Component{
  render(){
    return <div>INI HEADER</div>
  }
}


function App() {
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signout" component={Signout} />
        <ProtectedRoutes exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}
export default App;
