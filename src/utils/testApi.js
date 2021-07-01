const request = require("request");

const testApi = (param, callback) => {
  let url = `https://conf-demo-app.herokuapp.com/`;
  if (param) {
    url = url + param;
  }

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("something went wrong!", undefined);
    } else {
      const data = response.body;
      callback(undefined, data);
    }
  });
};

module.exports = { testApi };
