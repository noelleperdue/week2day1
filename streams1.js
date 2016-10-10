var http = require("http");

var requestOptions = {
  host: "highparknaturecentre.com",
  path: "/"
};

function printHTML(data) {
  console.log(data);
}

function readHTML(site, callback) {
http.get(site, (response) => {    // HTTP Response Callback

  response.setEncoding("utf8");             // Use UTF-8 encoding

  response.on("data", function(data) {           // On Data Received
    printHTML(data);
  });

  response.on("end", function() {                // On Data Completed
    console.log("Response stream complete.");
  });

});
};

console.log(readHTML(requestOptions));