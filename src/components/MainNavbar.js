import React from 'react';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../assets/logo.svg';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const handleTheme = e => {
    dispatch({ type: 'TOGGLE_THEME', payload: e.currentTarget.value });
  };
  //toggle theme button
  const toggle = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  return (
    <Navbar
      className='navbar-container px-sm-3 p-1 '
      collapseOnSelect
      expand='sm'
      bg={theme === 'light' ? 'dark' : 'light'}
      variant={theme === 'light' ? 'dark' : 'light'}
    >
      <LinkContainer exact to='/'>
        <Navbar.Brand>
          <img
            src={Logo}
            width='30'
            height='30'
            className='mr-2 d-inline-block align-center'
            alt='herolo weather app'
          />{' '}
          <h1 className='logo-title'>Weather App</h1>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          {' '}
          <ButtonGroup toggle>
            {toggle.map((btn, idx) => (
              <ToggleButton
                key={idx}
                type='radio'
                variant='primary'
                name='radio'
                value={btn.value}
                checked={theme === btn.value}
                onChange={handleTheme}
              >
                {btn.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <div className='nav-divider' />
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
