import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import CityFilter from '../components/HomePage/CityFilter';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Trash, ArrowClockwise } from 'react-bootstrap-icons';
import { toFahrenheit } from '../helperFunctions';
import useFetch from '../customHooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorToast from '../components/ErrorToast';
import FiveDays from '../components/FiveDays';
const HomePage = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(state => state.currentCity);
  const favoritesList = useSelector(state => state.favorites);

  const [celcius, setCelcius] = useState(true);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    //check and fetch current geolocation
    if (navigator.geolocation && currentCity.name === 'Your location') {
      navigator.geolocation.getCurrentPosition(position => {
        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_SECRET_API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}`
        )
          .then(res => res.json())
          .then(data => {
            dispatch({
              type: 'CURRENT_CITY',
              payload: { name: 'Your location', key: data.Key },
            });
          })
          .catch(() => {
            setApiError(true);
          });
      });
    }
  }, []);
  //fetch immediately api hook
  const fiveDaysApi = useFetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity.key}?apikey=${process.env.REACT_APP_SECRET_API_KEY}`,
    {}
  );
  const currentCityApi = useFetch(
    `https://dataservice.accuweather.com/currentconditions/v1/${currentCity.key}?apikey=${process.env.REACT_APP_SECRET_API_KEY}`,
    {}
  );

  const isFavorite = favoritesList.some(f => f.name === currentCity.name);

  const dispatchToFavorites = isFavorite => {
    const action = isFavorite ? 'REMOVE' : 'ADD';
    dispatch({ type: `${action}_FAVORITES`, payload: currentCity });
  };

  if (fiveDaysApi.isLoading || currentCityApi.isLoading) {
    return <LoadingSpinner />;
  }

  if (currentCityApi.error || fiveDaysApi.error || apiError) {
    return <ErrorToast />;
  }

  return (
    <Container>
      <Row className='pt-2 d-flex align-items-center justify-content-between mx-md-2 '>
        <Col className=' text-center d-flex align-items-center justify-content-center'>
          <CityFilter />
        </Col>
      </Row>
      <Row className='pt-2 d-flex justify-content-around align-items-center'>
        <Col className='pr-1' xs={6} md={3}>
          <div className='border-container'>
            <p className='current-day-title'>{currentCity.name}</p>
            <img
              style={{ width: '75px', height: '45px' }}
              src={`/Weather-icons/${currentCityApi.response[0].WeatherIcon}.png`}
              alt='weather-icon'
            />
            <p className='current-day-text'>
              {celcius
                ? currentCityApi.response[0].Temperature.Metric.Value
                : toFahrenheit(
                    currentCityApi.response[0].Temperature.Metric.Value
                  )}
              &#176;
            </p>
          </div>
        </Col>

        <Col xs={6} md={3} className='pl-1'>
          <div className='p-2 border-container'>
            <Button
              className='mb-2'
              onClick={() => dispatchToFavorites(isFavorite)}
              size='sm'
              variant={isFavorite ? 'danger' : 'light'}
            >
              {isFavorite ? <Trash /> : <Heart color='red' />}{' '}
              {isFavorite ? 'Remove' : 'Add favorite'}
            </Button>

            <Button
              variant='outline-light'
              size='sm'
              onClick={() => setCelcius(prev => !prev)}
            >
              <ArrowClockwise
                style={{ transform: celcius ? 'scaleX(-1)' : 'scaleX(1)' }}
              />{' '}
              {celcius ? 'celcius' : 'fahrenheit'}
            </Button>
          </div>
        </Col>
      </Row>

      <Row className='d-flex justify-content-center align-items-center pt-3'></Row>
      <Row className='d-flex justify-content-center'>
        <Col xs={9}>
          <h2 className='city-title text-thin text-light'>
            {currentCity.name}
          </h2>
        </Col>
      </Row>

      <Row className='px-lg-5 mx-lg-5 '>
        <FiveDays celcius={celcius} days={fiveDaysApi} />
      </Row>
    </Container>
  );
};
export default HomePage;
