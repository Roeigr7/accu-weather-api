import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const EmptyFavorites = () => {
  return (
    <Container>
      <Row className='pt-5'>
        <Col className='d-flex justify-content-center align-items-center'>
          <div className='no-favorites-container'>
            <p className='no-favorites-text'>
              You have no selected favorite cities
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default EmptyFavorites;
