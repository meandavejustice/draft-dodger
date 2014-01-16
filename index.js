#! /usr/bin/env node

var prompt = require('prompt');
var child = require('child_process');

prompt.message = "draft-dodger".rainbow;

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

module.exports = function() {
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
