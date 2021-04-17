import React from 'react';
import { Container } from 'react-bootstrap';
import ReactLoading from 'react-loading';

const LoadingSpinner = () => (
  <Container className='d-flex justify-content-center mx-auto'>
    <ReactLoading type='cylon' color={'black'} height={'20%'} width={'20%'} />
  </Container>
);

export default LoadingSpinner;
