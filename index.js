require("babel-polyfill");

var fs = require("fs");
var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error("Error parsing .babelrc.");
  console.error(err);
}

require("babel-register")(config);
require("./app/server");
