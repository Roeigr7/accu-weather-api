import React from 'react';
import { Navbar, Nav, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../assets/logos/logo.svg';

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
        <Nav className='pb-sm-0 pb-3 d-flex align-items-center ml-auto text-center responsive-nav'>
          <LinkContainer className='nav-button' exact to='/'>
            <Nav.Link>Weather</Nav.Link>
          </LinkContainer>
          <LinkContainer className='nav-button' to='/favorites'>
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
          <div className='nav-divider' />
          <ButtonGroup className='mx-auto p-1 toggle-container' toggle>
            {toggle.map((btn, idx) => (
              <ToggleButton
                size='sm'
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MainNavbar;
