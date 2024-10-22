import React, { Component, Fragment } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

import "./header.css";
import Logo from "../../Assets/SilverTrackerSeven.png";

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="header p-2"
        >
          <Navbar.Brand href="/" className="ml-5">
            <img src={Logo} className="logo" alt="SilverTracker Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-5">
              {localStorage.getItem("userId") === null ? (
                <>
                  <Link to="/login" className="mr-4 loginLink">
                    Login
                  </Link>
                  <Link to="/register">
                    <Button className="butRegister mb-0">Register</Button>
                  </Link>
                </>
              ) : (
                <Link to="/profile" className="mr-4 profileLink">
                  {localStorage.getItem("username")}
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default withRouter(Header);
