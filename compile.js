#!/usr/bin/env node

var fs = require('fs'), files = fs.readdirSync('messages/');

var fieldParser = {
  version: function(value) {
    var ret = [], m = value.match(/([\d.]+)( - ([\d.]+))?/);
    ret.push(m[1]); if (m[3]) ret.push(m[3]);
    return ret;
  },
  message: function(value) {
    return value.toString();
  },
  description: function(value) {
    return value.toString();
  }
};

function parsePart(part, obj) {
  var s = part.split(':'), key = s.shift();
  var value = s.join(':').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/^\s*(.*?)\s*$/, '$1');
  obj[key] = fieldParser[key](value);
};

function fileToMessage(file) {
  var contents = fs.readFileSync("messages/" + file);
  var parts = contents.toString().split('\n\n');
  var ret = { id: file };
  for (var i = 0, len = parts.length; i < len; i++) {
    parsePart(parts[i], ret);
  }
  return ret;
};

var messages = (function() {
  var results = [];
  for (var i = 0, len = files.length; i < len; i++) {
    results.push(fileToMessage(files[i]));
  }
  return results;
})();

fs.writeFileSync('./public/germ.db', JSON.stringify(messages));
process.exit(0);
