var request = require('request');
var fs = require('fs');
var token = require('./secrets.js')
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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
  for (var i in result) {
    var fileNames = result[i].avatar_url

    console.log("File Path: ", fileNames);

    downloadImageByURL(fileNames, './abc/' + [i] + ".jpg");
  }

  console.log("Errors:", err);

});


