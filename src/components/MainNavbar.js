import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../assets/logo.svg';
const MainNavbar = () => {
  return (
    <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
      <LinkContainer exact to='/'>
        <Navbar.Brand>
          <img
            src={Logo}
            width='30'
            height='30'
            className='mr-2 d-inline-block align-center'
            alt='herolo weather app'
          />{' '}
          Herolo Weather
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          {' '}
          <LinkContainer exact to='/'>
            <Nav.Link>Weather</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/favorites'>
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MainNavbar;
