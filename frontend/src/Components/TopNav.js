import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../User-context";

const TopNav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const logOutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false)
  };

  return isLoggedIn ? (
    <div>
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} />
        <Link to="/login" onClick={logOutHandler}>
          Logout
        </Link>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/events">Events</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/myregistration">My Reagistration</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  ) : (
    ""
  );
};

export default TopNav;
