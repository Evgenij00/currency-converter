import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { LinkContainer } from 'react-router-bootstrap'

const Header: React.FC = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>Конвертер валют</Navbar.Brand>
      </LinkContainer>
      <Nav className='mr-auto'>
        <LinkContainer to='/'>
          <Nav.Link>Курсы валют</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/convert'>
          <Nav.Link>Калькулятор</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}

export default Header
