import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Currencies</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>Курс валют</Nav.Link>
          <Nav.Link>Конвертер</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
