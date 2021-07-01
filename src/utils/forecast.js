const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7f59a3da70dcf69f6a75c17eb046a61e&query=${latitude},${longitude}&units=m`;

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
