var request = require('request');
var token = require('./secrets.js')
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'Bearer ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i of result) {
    console.log(i.avatar_url)
  }
});


