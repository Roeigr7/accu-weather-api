import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import CityFilter from '../components/HomePage/CityFilter';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Trash, ArrowClockwise } from 'react-bootstrap-icons';
import moment from 'moment';
import { toCelcius, toFahrenheit } from '../helperFunctions';
import useFetch from '../customHooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorToast from '../components/ErrorToast';
const HomePage = () => {
  const dispatch = useDispatch();

  const currentCity = useSelector(state => state.currentCity);
  const favoritesList = useSelector(state => state.favorites);
  const [celcius, setCelcius] = useState(true);
  const [apiError, setApiError] = useState(false);
  const isFavorite = favoritesList.some(f => f.name === currentCity.name);
  useEffect(() => {
    if (navigator.geolocation && currentCity.name === 'initialLanding') {
      navigator.geolocation.getCurrentPosition(position => {
        fetch(
          `http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_SECRET_API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}`
        )
          .then(res => res.json())
          .then(data => {
            dispatch({
              type: 'CURRENT_CITY',
              payload: { name: 'Your location', key: data.Key },
            });
          })
          .catch(error => {
            setApiError(true);
          });
      });
    }
  }, []);

  const fiveDaysApi = useFetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity.key}?apikey=${process.env.REACT_APP_SECRET_API_KEY}`,
    {}
  );
  const currentCityApi = useFetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${currentCity.key}?apikey=${process.env.REACT_APP_SECRET_API_KEY}`,
    {}
  );

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
      <Row className='d-flex align-items-center justify-content-between mx-md-2 '>
        <Col
          lg={3}
          md={4}
          sm={4}
          className='text-center d-flex align-items-center justify-content-center'
        >
          <div className='current-day-container'>
            <img
              style={{ width: '75px', height: '45px' }}
              src={`/Weather-icons/${currentCityApi.response[0].WeatherIcon}.png`}
              alt='weather-icon'
            />
            <div className='current-day-text-container'>
              <p className='current-day-text'>{currentCity.name}</p>
              <p className='current-day-text'>
                {celcius
                  ? currentCityApi.response[0].Temperature.Metric.Value
                  : toFahrenheit(
                      currentCityApi.response[0].Temperature.Metric.Value
                    )}
                &#176;
              </p>
            </div>
          </div>
        </Col>
        <CityFilter />
        <Col lg={3} md={4} sm={4} className=' text-center'>
          <Button
            onClick={() => dispatchToFavorites(isFavorite)}
            size='sm'
            variant={isFavorite ? 'outline-danger' : 'outline-primary'}
          >
            {isFavorite ? <Trash /> : <Heart />}{' '}
            {isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
          </Button>
        </Col>
      </Row>

      <Row className='d-flex justify-content-center align-items-center pt-3'>
        <Col
          md={3}
          className='d-flex justify-content-center align-items-center'
        >
          <Button size='sm' onClick={() => setCelcius(prev => !prev)}>
            <ArrowClockwise /> {celcius ? 'celcius' : 'fahrenheit'}
          </Button>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xs={5}>
          <h2 className='city-title'>{currentCity?.name}</h2>
        </Col>
      </Row>
      <Row className='px-lg-5 mx-lg-5 '>
        <div className='days-grid'>
          {fiveDaysApi.response &&
            fiveDaysApi.response.DailyForecasts.map((day, i) => (
              <div key={i} className='day-container'>
                <p>{moment(day.Date).format('dddd')}</p>
                <p className='day-text'>
                  {celcius
                    ? toCelcius(day.Temperature.Minimum.Value)
                    : day.Temperature.Minimum.Value}
                  &#176; -{' '}
                  {celcius
                    ? toCelcius(day.Temperature.Maximum.Value)
                    : day.Temperature.Maximum.Value}
                  &#176;
                </p>
              </div>
            ))}
        </div>
      </Row>
    </Container>
  );
};
export default HomePage;
