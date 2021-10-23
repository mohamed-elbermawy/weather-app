const http = require('http');

const httpForeCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f6512b253fc9e77ac311b3800aa83749&query=${latitude},${longitude}&units=f`;

  const request = http.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });
    response.on("end", () => {
      let returnData = JSON.parse(data);
      
      if (returnData.error) {
        callback("unable to find location. try again", undefined);
      } else {
        callback(undefined, {
          status: returnData.current.weather_descriptions[0],
          temperature: returnData.current.temperature,
          precip: returnData.current.precip,
        });
      }
    });
  });

  request.on("error", (error) => {
    callback("unable to connect to weather service", undefined);
  });

  request.end();
};

module.exports = httpForeCast;