const request = require("request");
require("dotenv").config();

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_ACCESS_KEY}&limit=1`;

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
