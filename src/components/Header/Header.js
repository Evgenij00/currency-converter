import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { LinkContainer } from 'react-router-bootstrap'

export default class Header extends Component {
  render() {
    return (
      <Navbar bg='dark' variant='dark'>
        <LinkContainer to='/'>
          <Navbar.Brand>Currencies</Navbar.Brand>
        </LinkContainer>
        <Nav className='mr-auto'>
          <LinkContainer to='/'>
            <Nav.Link>Курс валют</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/convert'>
            <Nav.Link>Конвертер</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}
