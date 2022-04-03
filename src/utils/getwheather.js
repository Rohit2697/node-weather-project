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
      callback(
        undefined,
        `its ${body.current.weather_descriptions[0]} out there, current tempurture is ${body.current.temperature} degree, feels like ${body.current.feelslike} degree and there is ${body.current.precip}% chance of rain`
      );
    }
  });
};

module.exports = getWheather;
