import React, { Component, Fragment } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

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
          <Navbar.Brand className="ml-5">
            <img src={Logo} className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-5">
              <Nav.Link className="mr-4">Login</Nav.Link>
              <Button className="butRegister">Register</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default Header;
