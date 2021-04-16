import React from 'react';
import { Container } from 'react-bootstrap';
import ReactLoading from 'react-loading';

const LoadingSpinner = () => (
  <div className='page-container'>
    <Container className='d-flex justify-content-center'>
      <ReactLoading type='cylon' color={'black'} height={'20%'} width={'20%'} />
    </Container>
  </div>
);

export default LoadingSpinner;
