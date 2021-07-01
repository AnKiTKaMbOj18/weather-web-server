const request = require("request");
require("dotenv").config();

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_ACCESS_KEY}&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("something went wrong!", undefined);
    } else if (response.body.features && !response.body.features.length) {
      callback("Unable to find location!", undefined);
    } else {
      const data  = response.body;
      const dataObj = {
        description: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        feelsLike: data.current.feelslike,
      }
      callback(undefined, dataObj);
    }
  });
};

module.exports = { forecast }
