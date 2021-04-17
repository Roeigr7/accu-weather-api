import moment from 'moment';
import React from 'react';
import { toCelcius } from '../../helperFunctions';
import LoadingSpinner from '../shared/LoadingSpinner';
const FiveDays = ({ days, celcius, isLoading }) => {
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='days-grid'>
      {days &&
        days.DailyForecasts.map((day, i) => (
          <div key={i} className='day-container'>
            <p className='text-thin'>{moment(day.Date).format('ddd')}</p>
            <img
              style={{ maxWidth: '75px', width: '100%', height: 'auto' }}
              src={`/Weather-icons/${day.Day.Icon}.png`}
              alt='weather-icon'
            />
            <div className='day-text-container'>
              <p>
                {celcius
                  ? toCelcius(day.Temperature.Maximum.Value)
                  : day.Temperature.Maximum.Value}
                &#176;
              </p>
              <span>
                {celcius
                  ? toCelcius(day.Temperature.Minimum.Value)
                  : day.Temperature.Minimum.Value}
                &#176;
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
export default FiveDays;
