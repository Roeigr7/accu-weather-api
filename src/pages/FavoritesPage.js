import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import { API_KEY, BASE_URL } from '../apiKeys';
import ErrorToast from '../components/ErrorToast';
const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);
  const theme = useSelector(state => state.theme);

  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  useEffect(() => {
    for (const city of favorites) {
      fetch(`${BASE_URL}/currentconditions/v1/${city.key}?apikey=${API_KEY}`)
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
      <div className={theme === 'light' ? null : 'dark-theme'}>
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
      </div>
    );
  }

  return (
    <div className={theme === 'light' ? null : 'dark-theme'}>
      {apiError && <ErrorToast />}
      <Row className='p-1 m-0'>
        {favoritesList.map((city, i) => (
          <Col md={2} sm={3} xs={6} key={i} className='p-1'>
            <LinkContainer exact to='/'>
              <Card
                onClick={() => handleFavoriteClick(city)}
                className='favorite-card text-center'
              >
                <Card.Header className='card-header bg-dark text-white text-center p-0 m-0 py-1'>
                  {city.name}
                </Card.Header>
                <Card.Body className='pb-0 px-0 mx-0'>
                  <Card.Subtitle className='mb-1 text-muted'>
                    {city.currentTemp}&#176;
                  </Card.Subtitle>
                  <Card.Text className='mb-1 p-0 m-0 card-text'>
                    {city.weatherText}
                  </Card.Text>
                  <Card.Img
                    variant='top'
                    src={`/Weather-icons/${city.weatherIcon}.png`}
                    style={{ width: '75px', height: '45px' }}
                  />
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default FavoritesPage;
