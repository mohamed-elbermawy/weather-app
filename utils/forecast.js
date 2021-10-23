const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const weather_url =
    `http://api.weatherstack.com/current?access_key=f6512b253fc9e77ac311b3800aa83749&query=${latitude},${longitude}&units=f`;
  request({ url: weather_url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("unable to find location. try again", undefined);
    } else {
      const data = response.body;
      callback(undefined, {
        status: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        precip: data.current.precip,
      });
    }
  });
};

module.exports = forecast;