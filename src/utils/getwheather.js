const request = require("request");
const getWheather = (latitute, longitute, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=90bbc3dc4244aa575bf54997dfcbd1bf&query=" +
    latitute +
    "," +
    longitute +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) callback("Unable to connect the server", undefined);
    else if (body.error)
      callback("Unable to find the location, please try again", undefined);
    else {
      callback(undefined, {
        img: body.current.weather_icons[0],

        forcast: `its ${
          body.current.weather_descriptions[0]
        } out there, current temperature is ${
          body.current.temperature
        } degree, feels like ${body.current.feelslike} degree and there is ${
          body.current.precip
        }% chance of rain.
        Humidity is ${body.current.humidity} and it is ${
          body.current.is_day === "no" ? "Night" : "Day"
        } time`,
      });
    }
  });
};

module.exports = getWheather;
