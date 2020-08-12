import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import EventsPage from './pages/Events/Events';

const Routes = () => {
    return(
  <Router>
    <Switch>
    <Route path="/" exact component={Dashboard}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/events" exact component={EventsPage}/>
    </Switch>
  </Router>
    )
};

export default Routes;
