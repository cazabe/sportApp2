import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import EventsPage from './pages/Events/Events';
import TopNav from "./Components/TopNav";
import MyRegistration from "./pages/MyRegistrations/index";
const Routes = () => {
    return(
  <Router>
    <TopNav/>
    <Switch>
    <Route path="/" exact component={Dashboard}/>
    <Route path="/myregistration" exact component={MyRegistration}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/events" exact component={EventsPage}/>
    </Switch>
  </Router>
    )
};

export default Routes;
