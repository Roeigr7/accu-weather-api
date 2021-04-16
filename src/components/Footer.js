import React from 'react';
import { Navbar } from 'react-bootstrap';
import react from '../assets/logos/react.png';
import bootstrap from '../assets/logos/bootstrap.png';
const Footer = () => {
  return (
    <Navbar className='footer-container d-flex align-items-center justify-content-center'>
      <img className='credit-logos' src={react} alt='react-logo' />
      <p className='text-center rights'>All rights reserved © Roei Grinshpan</p>
      <img className='credit-logos' src={bootstrap} alt='bootstrap' />
    </Navbar>
  );
};
export default Footer;
