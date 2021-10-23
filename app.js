const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const httpForeCast = require("./utils/httpForeCast");
const httpsGeoCode = require("./utils/httpsGeoCode");

const address = process.argv[2];

// using request package

if(!address){
    console.log("Please provide an address");
}else{

    geocode(address, (error, data) => {
      if (error) {
        return console.log(error);
      } 
    
      forecast(data.latitude, data.longitude, (error, forecastdata) => {
        if (error) {
          return console.log(error);
        }
    
        console.log(data.location);
        console.log(forecastdata);
      });
    
    });
}

// using http/https core modules

// if(!address){
//     console.log("Please provide an address");
// }else{

//   httpsGeoCode("address", (error, data) => {
//     if (error) {
//       return console.log(error);
//     }

//     httpForeCast(data.latitude, data.longitude, (error, forecastdata) => {
//       if (error) {
//         return console.log(error);
//       }

//       console.log(data.location);
//       console.log(forecastdata);
//     });

//   });
// }


