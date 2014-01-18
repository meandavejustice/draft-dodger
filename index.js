#! /usr/bin/env node
var fs = require('fs');
var prompt = require('prompt');
var child = require('child_process');
var ignore;
var tmpPath;

prompt.message = "draft-dodger".rainbow;
mktemp.createFile('tmp-gitignore', function(err, path) {
  if (err) throw err;
  tmpPath = path;
  console.log(path);  // match to /^file-[\da-zA-Z]{6}$/
});

function getMsg(files) {
  var msg = 'Are you sure you want to add ';
  if (files.length && files[0] !== '') {
    for(var i = 0; i < files.length; i++) {
      if (files[i] !== '') {
        if (i === 0) {
          msg+=files[i];
        } else if (i === files.length) {
          msg+= " and " + files[i].cyan + "?";
        } else {
          msg+= " and " + files[i].cyan;
        }
      }
    }
    return msg;
  } else {
    console.log("You don't have any untracked files to add to ignore right now.".pink);
    process.exit();
  }
}

function writeTemp(data) {
  fs.
}

function getDrafts() {
  fs.createReadStream('./.gitignore')
    .pipe(split())
    .pipe(through(function(data) {
      if (data.indexOf('*Dodged*') !== -1) {
        this.queue(data);
      }
    }))
    .pipe(function(data) {
      fs.createWriteStream(tmpPath)
        .pipe(data);
    })

  var paths = ignore.split('\n');
  var dodged = [];
  for(var i = 0; i < paths.length; i++) {
    if (paths[i].indexOf('*dodged*' !== -1)) {
      dodged.push(paths[i]);
    }
  }
  return dodged;
}

function removeDraft(path) {
  ignore.
}

module.exports = function() {
  prompt.start();
  var dodged = getDrafts();
  if (dodged.length) {
    console.log('you have %d files dodged, do you want to enlist any? (Y/N)');
    process.stdin.resume()
    process.stdin.on('data', function(chunk) {
      if (chunk.toLowerCase() === 'y') {
        promt.get(['file id:'], function(err, result) {
        })
      }
    })
  }
  console.log()
  var initChild = child.exec('git ls-files --others --exclude-standard');

  initChild.stdout.on('data', function(data) {
    var files = data.split('\n');
    prompt.start();
    var msg = getMsg(files);
    prompt.get([msg+"(Y/N)"], function(err, result) {
      if (result[msg+"(Y/N)"].toLowerCase() === 'y') {
        child.exec('cd "$(git rev-parse --show-toplevel)"');
        console.log('\n');
        child.exec('echo \n \n \n >> .gitignore');
        for(var i = 0; i < files.length; i++) {
          if (files[i] !== '') {
            child.exec('echo ' + files[i] + '>> .gitignore');
            console.log('*%s added', files[i]);
          }
        }
        console.log('\n ( ͡° ͜ʖ ͡°) cya next time!');
      } else {
        console.log('K BYE');
      }
    })
  });
};
