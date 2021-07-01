const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5raXRrYW1ib2oxOCIsImEiOiJja3FjaGt4engwaHU3MndzMWFpM3U3amR3In0.kc5uq8Oh_UvBgdAy4PH5Fw&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features && !response.body.features.length) {
      callback("Unable to find data for location!", undefined);
    } else {
      const data  = response.body;
      const dataObj = {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      }
      callback(undefined, dataObj);
    }
  });
};

module.exports = { geoCode }
