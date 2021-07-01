const request = require("request");

const testApi = (callback) => {
  const url = `https://conf-demo-app.herokuapp.com/`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("something went wrong!", undefined);
    } else {
      const data  = response.body;
      callback(undefined,data);
    }
  });
};

module.exports = { testApi }
