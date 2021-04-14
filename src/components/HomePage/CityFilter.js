import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch } from 'react-redux';
import ErrorToast from '../ErrorToast';
const CityFilter = () => {
  const dispatch = useDispatch();
  const [autoComplete, setAutoComplete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  //set the selectedCity to currentCity in redux state
  const dispatchCity = selectedCity => {
    if (selectedCity.length === 0) {
      return null;
    } else {
      dispatch({ type: 'CURRENT_CITY', payload: selectedCity[0] });
    }
  };

  const handleSearch = input => {
    setLoading(true);
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_SECRET_API_KEY}&q=${input}`
    )
      .then(res => res.json())
      .then(data => {
        setAutoComplete(
          data.map(city => {
            return {
              name: city.LocalizedName,
              key: city.Key,
            };
          })
        );
        setLoading(false);
      })
      .catch(error => {
        setApiError(true);
        setLoading(false);
      });
  };

  return (
    <Col md={4} sm={4} className='mt-4'>
      {apiError && <ErrorToast />}
      <Form.Group className='text-center' controlId='formBasicEmail'>
        <Form.Label>Choose a City</Form.Label>
        <AsyncTypeahead
          isLoading={loading}
          onChange={dispatchCity}
          labelKey={option => `${option.name}`}
          options={autoComplete}
          id='basic-typeahead-single'
          onSearch={handleSearch}
        />
        {/* {!isloading&&errormessage fill} */}
        <Form.Text className='text-muted'>
          Choose a city to see next 5 days weather
        </Form.Text>
      </Form.Group>
    </Col>
  );
};
export default CityFilter;
