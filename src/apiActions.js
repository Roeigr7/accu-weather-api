import axios from 'axios';
export function cur(city) {
  console.log('currrrrrrrr functoion', city);
  axios
    .get(
      `http://dataservice.accuweather.com/currentconditions/v1/${city}?apikey=cJG39vM13UlVfayShalCweudMm3trAU8`
    )
    .then(response => {
      return {
        temp: response.data[0].Temperature.Metric.Value,
        type: response.data[0].Temperature.Metric.Unit,
      };
    })

    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
