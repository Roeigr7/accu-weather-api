import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import CityFilter from '../components/HomePage/CityFilter';
import { useSelector, useDispatch } from 'react-redux';
import {handleFavorites,initialLocation} from '../redux/actions';
import { Heart, Trash, ArrowClockwise } from 'react-bootstrap-icons';
import { toFahrenheit } from '../helperFunctions';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorToast from '../components/shared/ErrorToast';
import FiveDays from '../components/HomePage/FiveDays';
import CloudsAnimation from '../components/HomePage/CloudsAnimation';
import appLogo from '../assets/logos/applogo.png';
import {
  getInitialData,
  getCurrentData,
  getForecastsData,
} from '../apiActions';
const HomePage = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(state => state.currentCity);
  const favoritesList = useSelector(state => state.favorites);
  const [celcius, setCelcius] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cityDetails, setCityDetails] = useState(null);
  const [forecast, setForecast] = useState(null);
  
  useEffect(() => {
    ///fetch data depend on initial landing or not
    async function fetchData() {
      let initial;
      let current;
      let forecasts;
      let checkInitial = false;
      try {
        setIsLoading(true);
        if (!currentCity.Key) {
          initial = await getInitialData();
          dispatch(initialLocation(initial.Key))
     
          checkInitial = true;
          
        }
        current = await getCurrentData(checkInitial ? initial : currentCity);
        forecasts = await getForecastsData(
          checkInitial ? initial : currentCity
        );
        setIsLoading(false);
      } catch (e) {
        setApiError(true);
        setIsLoading(false);
      }
      setCityDetails(current);
      setForecast(forecasts);
    }
    fetchData();
  }, [currentCity]);

  const isFavorite = favoritesList.some(f => f.name === currentCity.name);
  const dispatchToFavorites = isFavorite => {
    const action = isFavorite ? 'REMOVE' : 'ADD';
    dispatch(handleFavorites(action,currentCity))
  };

  if (apiError) return <ErrorToast />;
  
  return (
    <>
      <Container className='home-container pb-0 mb-0'>
        <Row className='d-flex align-items-center justify-content-center p-4'>
          <img className='app-logo' src={appLogo} alt='app-weather-logo' />
        </Row>
        <Row className='pt-2 d-flex align-items-center justify-content-between mx-md-2 '>
          <Col className=' text-center d-flex align-items-center justify-content-center'>
            <CityFilter />
          </Col>
        </Row>
        <Row className='pt-4 pt-sm-2 d-flex justify-content-around align-items-center'>
          <Col className='pr-1' xs={6} md={3}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              cityDetails && (
                <div className='border-container'>
                  <p className='current-day-title'>{currentCity.name}</p>
                  <img
                    style={{ width: '75px', height: '45px' }}
                    src={`/Weather-icons/${cityDetails[0].WeatherIcon}.png`}
                    alt='weather-icon'
                  />
                  <p className='current-day-text'>
                    {celcius
                      ? cityDetails[0].Temperature.Metric.Value
                      : toFahrenheit(cityDetails[0].Temperature.Metric.Value)}
                    &#176;{celcius? 'c':'f'}
                  </p>
                </div>
              )
            )}
          </Col>

          <Col xs={6} md={3} className='pl-1'>
            <div className='p-2 border-container'>
              <Button
                className='mb-2'
                onClick={() => dispatchToFavorites(isFavorite)}
                variant={isFavorite ? 'danger' : 'light'}
              >
                {isFavorite ? <Trash /> : <Heart color='red' />}{' '}
                {isFavorite ? 'Remove' : 'Add favorite'}
              </Button>

              <Button
                variant='outline-light'
                onClick={() => setCelcius(prev => !prev)}
              >
                <ArrowClockwise
                  style={{ transform: celcius ? 'scaleX(-1)' : 'scaleX(1)' }}
                />{' '}
                {celcius ? 'to fahrenheit' : 'to celcius'}
              </Button>
            </div>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center align-items-center pt-4 pt-sm-2'>
          <Col xs={9}>
            <h2 className='city-title text-thin text-light'>
              {currentCity.name}
            </h2>
          </Col>
        </Row>

        <Row className='px-lg-5 mx-lg-5 '>
          <FiveDays isLoading={isLoading} celcius={celcius} days={forecast} />
        </Row>
      </Container>
      <CloudsAnimation />
    </>
  );
};
export default HomePage;
