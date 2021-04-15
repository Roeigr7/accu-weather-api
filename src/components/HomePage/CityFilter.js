import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch } from 'react-redux';
import { API_KEY, BASE_URL } from '../../apiKeys';
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
    //autocomplete api when user input
    setLoading(true);
    fetch(
      `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${input}`
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
      .catch(() => {
        setApiError(true);
        setLoading(false);
      });
  };

  return (
    <>
      {apiError && <ErrorToast />}

      <AsyncTypeahead
        size='sm'
        isLoading={loading}
        onChange={dispatchCity}
        labelKey={option => `${option.name}`}
        options={autoComplete}
        id='basic-typeahead-single'
        onSearch={handleSearch}
        placeholder='Choose a city'
      />
    </>
  );
};
export default CityFilter;
