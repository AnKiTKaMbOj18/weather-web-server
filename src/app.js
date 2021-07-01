const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoCode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");
const { testApi } = require("./utils/testApi");

const app = express();
const port = process.env.PORT || 3000;
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

// define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// to resolve cors issue for browser call
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get("/home", (req, res) => {
  res.render("index", {
    title: "Weather App",
    description: "Use this site to get your weather!",
    footerText: "Home Footer",
    createdBy: "Ankit Kamboj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    description: "About Page for weather app",
    footerText: "About Footer",
    createdBy: "Ankit Kamboj",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    description: "Help page content!",
    footerText: "Help Footer",
    createdBy: "Ankit Kamboj",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello Express!");
// });

// app.get("/help", (req, res) => {
//   res.send("<h1>Help Page!</h1>");
// });

// app.get("/about", (req, res) => {
//   res.send({
//     name: "test",
//     location: "undefined",
//   });
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address!",
    });
  }
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      // console.log(data.location);
      // console.log(forecastData);
      return res.send({
        location: data.location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   address: req.query.address,
  //   forecast: "",
  //   location: "",
  // });
});

app.get("/test", (req, res) => {
  testApi((error, data) => {
    if (error) {
      res.send({
        error: error,
      });
    } else {
      res.send({
        data,
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  // console.log(req);
  res.send({
    products: [],
    search: req.query.search,
    rating: req.query.rating,
  });
});

app.get("/help/*", (req, res) => {
  // res.send("Help page content not found!");
  res.render("404", {
    title: "Not found!",
    errorMessage: "Help article not found",
    footerText: "Not found page footer",
    createdBy: "Ankit Kamboj",
  });
});

app.get("*", (req, res) => {
  // res.send("My 404 page!");
  res.render("404", {
    title: "Not found!",
    errorMessage: "Page not found",
    footerText: "Not found page footer",
    createdBy: "Ankit Kamboj",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
