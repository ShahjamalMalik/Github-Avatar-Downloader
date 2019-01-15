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

function downloadImageByURL(url, filePath) {

  request.get(url)               // Note 1
  .on('error', function (err) {                                   // Note 2
    throw err;
  })
  .on('response', function (response) {                           // Note 3
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));               // Note 4
}





getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i of result) {
    console.log(i.avatar_url)
  }
});


