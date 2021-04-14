import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import ErrorToast from '../components/ErrorToast';
const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  useEffect(() => {
    for (const city of favorites) {
      fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${city.key}?apikey=${process.env.REACT_APP_SECRET_API_KEY}`
      )
        .then(response => response.json())
        .then(data => {
          const updateCityTemp = {
            name: city.name,
            key: city.key,
            currentTemp: data[0].Temperature.Metric.Value,
            weatherText: data[0].WeatherText,
            weatherIcon: data[0].WeatherIcon,
          };
          setFavoritesList(prev => [...prev, updateCityTemp]);
        })
        .catch(() => {
          setApiError(true);
        });
    }
  }, []);

  const handleFavoriteClick = selectedCity => {
    dispatch({
      type: 'CURRENT_CITY',
      payload: { name: selectedCity.name, key: selectedCity.key },
    });
  };
  if (!favorites || favorites.length === 0) {
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
  }

  return (
    <>
      {apiError && <ErrorToast />}
      <Row className='m-2 m-lg-5'>
        {favoritesList.map((city, i) => (
          <Col key={i} sm={3} className='p-2'>
            <LinkContainer exact to='/'>
              <Card
                onClick={() => handleFavoriteClick(city)}
                className='favorite-card text-center'
              >
                <Card.Header className='bg-dark text-white text-center'>
                  {city.name}
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className='mb-2 text-muted'>
                    {city.currentTemp}&#176;
                  </Card.Subtitle>
                  <Card.Text>{city.weatherText}</Card.Text>
                  <Card.Img
                    variant='top'
                    src={`/Weather-icons/${city.weatherIcon}.png`}
                  />
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default FavoritesPage;
