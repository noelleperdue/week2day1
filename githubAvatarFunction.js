const request = require("request");

ar githubRequest = function(endpoint, callback) {
  console.log(`https://api.github.com${endpoint}`)
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
    bearer: process.env.DB_BEARER,
    },
    headers: {
      'User-Agent': "request"
    }
  }
  request.get(requestData, callback)
}

function getRepoContributors(repoOwner, repoName, callback) {
  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    var data = JSON.parse(body);
  });
  }
// function getRepoContributors(repoOwner, repoName, cb) {
//   githubRequest(`/repos/:owner/:repo/contributors`, (err, response, body) => {
// }
// getRepoContributors("lighthouse-labs", "laser_shark", (err, result) => {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

function downloadImageByURL(url, filePath) {
  console.log(url);
  console.log(path);
}
  getRepoContributors(process.argv[2], process.argv[3], console.log);