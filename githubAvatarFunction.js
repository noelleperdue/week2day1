const request = require('request');
const fs = require('fs');
require('dotenv').config()

const githubRequest = function(endpoint, callback) {
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
    bearer: process.env.DB_BEARER
     },
    headers: {
      'User-Agent': "request"
    }
  }
  request.get(requestData, callback)
}

function downloadImageByURL(url, path) {
  console.log(url);
  console.log(path);

  var file = fs.createWriteStream(`./img/${path}.jpg`);
  request(url).pipe(file);

};

function getRepoContributors(repoOwner, repoName) {
  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    var contributors = JSON.parse(body);

    if (contributors.message === "Bad credentials") {
      throw new Error("You arent authorized to see this- check your token")
    }

    else if (contributors.message === "Not Found") {
      throw new Error("Repository or user not found- check your spelling");
    } else {
    contributors.forEach(function(contributor) {
      downloadImageByURL(contributor.avatar_url, contributor.login)
      console.log("path: ", contributor.login)
    });
  };
  })
};

if (process.argv.length !== 4) {
  throw new Error("Only enter the repo owner and name, please");
} else if (!process.env.DB_BEARER) {
  throw new Error("No .env file found")
}


  getRepoContributors(process.argv[2], process.argv[3], console.log);


