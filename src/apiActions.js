import { BASE_URL, API_KEY } from './apiKeys';
export const getInitialData = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(position => {
      fetch(
        `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${position.coords.latitude.toFixed(
          3
        )}%2C${position.coords.longitude.toFixed(3)}`
      )
        .then(res => res.json())
        .then(json => resolve(json));
    })
  );
};

export const getForecastsData = async currentCity => {
  return await fetch(
    `${BASE_URL}/forecasts/v1/daily/5day/${currentCity.Key}?apikey=${API_KEY}`
  ).then(res => res.json());
};

export const getCurrentData = currentCity => {
  return fetch(
    `${BASE_URL}/currentconditions/v1/${currentCity.Key}?apikey=${API_KEY}`
  ).then(res => res.json());
};
