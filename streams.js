var request = require("request");

request("http://www.highparknaturecentre.com", function(err, response, body) {
  if (err) {
    throw err;
  }

  console.log("Response Status Code:", body);

});