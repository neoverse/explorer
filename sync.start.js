/* eslint-disable no-eval */

const webpack = require("webpack");
const load = require("webpack-to-memory");
const config = require("./sync.config");

load(webpack(config)).then(function(files) {
  eval(files["sync.js"]);
});
