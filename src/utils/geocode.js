const request= require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1Ijoicm9oaXRkZXkyNjk3IiwiYSI6ImNrd2xvZmhzeTFzMHAyb21sMWhodTJxaDAifQ.LHLzlOg8LINfoqAEfVYK0A&limit=1`;
    request({ url, json: true }, (error, {body}) => {
      if (error) callback("Unable to connect the server", undefined);
      else if (body.features.length == 0)
        callback(
          "Unable to find location, please try again with a different one",
          undefined
        );
      else {
        callback(undefined,{
          placeName: body.features[0].place_name,
          latitute: body.features[0].geometry.coordinates[1],
          longitute: body.features[0].geometry.coordinates[0],
        });
      }
    });
  };

  module.exports=geoCode;
  