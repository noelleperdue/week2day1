const request = require('request');
const fs = require('fs');

const githubRequest = function(endpoint, callback) {
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
    bearer: '05eec1aea8e13f3adaa10753783eeae25fe5ed54'    },
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
    if (err) {
      console.log("error in getRepoContributors", error);
      return;
    } else {
    var contributors = JSON.parse(body);

    contributors.forEach(function(contributor) {
      downloadImageByURL(contributor.avatar_url, contributor.login)
      console.log("path: ", contributor.login)
    });
  };
  })
};


  getRepoContributors(process.argv[2], process.argv[3], console.log);


