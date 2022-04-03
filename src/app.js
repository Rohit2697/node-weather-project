const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWheather = require("./utils/getwheather");

const app = express();
const port = process.env.PORT || 3000;

//set up view engine and handlebars
const viewPath = path.join(__dirname, "/templates/views");
const partialPath = path.join(__dirname, "/templates/partials");

app.set("views", viewPath); // this is required to set the view path unless it can not find the view path
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//set up static directory to serve
const publicFileDirectory = path.join(__dirname, "../public");
app.use(express.static(publicFileDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rohit Dey",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello Express!!");
// });
// //Help
// app.get("/help", (req, res) => {
//   res.send("Help Page!");
// });

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Rohit Dey",
  });
});
// //About
// app.get("/about", (req, res) => {
//   res.send("<h1>About Page!</h1>");
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Rohit Dey",
  });
});
// //weather Page
// app.get("/weather", (req, res) => {
//   res.send({
//     location: "Murshidabad",
//     temperature: 40,
//     percip: 0,
//   });
// });

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // res.render("weather", {
  //   title: "Weather Page",
  //   location: "Murshidabad",
  //   temperature: 40,
  //   percip: 0,
  //   name: "Rohit Dey",
  // });
  // res.send({
  //   title: req.query.address,
  //   location: "Murshidabad",
  //   temperature: 40,
  //   percip: 0,
  //   name: "Rohit Dey",
  // });

  geocode(address, (error, { latitute, longitute, placeName } = {}) => {
    if (error) {
      return res.send({ error });
    }
    getWheather(latitute, longitute, (error, { img, forcast } = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        query: req.query.address,
        placeName,
        forcast,
        img,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404pagenotfound", {
    title: "404",
    errormessage: "Help article not found",
    name: "Rohit Dey",
  });
});

app.get("*", (req, res) => {
  res.render("404pagenotfound", {
    title: "404",
    errormessage: "Page not found",
    name: "Rohit Dey",
  });
});

app.listen(port, () => {
  console.log("Express server is up in port " + port);
});
