const https = require("https");

const httpsGeoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibW9oYW1lZC1lbGJlcm1hd3kiLCJhIjoiY2twNXV6cWlhMGVvOTJvcWVmM2RzazdxeSJ9.xna0i8vNbSI77F_QCmmr0w";

  const request = https.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });
    response.on("end", () => {
      
      let returnData = JSON.parse(data);

      if (returnData.features.length === 0) {
        callback("unable to find location. try again", undefined);
      } else {
        callback(undefined, {
          latitude: returnData.features[0].center[1],
          longitude: returnData.features[0].center[0],
          location: returnData.features[0].place_name,
        });
      }
    });
  });

  request.on("error", (error) => {
    callback("unable to connect to weather service", undefined);
  });

  request.end();
};

module.exports = httpsGeoCode;
