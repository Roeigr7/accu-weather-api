export function toFahrenheit(celcius) {
  return (celcius * 1.8 + 32).toFixed();
}

export function toCelcius(fahrenheit) {
  return ((fahrenheit - 32) / 1.8).toFixed();
}

export function checkIsFavorite(list, current) {
  console.log(
    'cscscscscs',
    list.findIndex(fav => fav.name === current.name) === '-1' ? true : false
  );
  if (list.includes(current) === false) {
    return false;
  } else return true;
}
