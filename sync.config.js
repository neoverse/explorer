/* eslint-disable no-sync */

const fs = require("fs");
const path = require("path");

const nodeModules = {};

fs.readdirSync("node_modules")
  .filter((folder) => {
    return [".bin"].indexOf(folder) === -1;
  })
  .forEach((folder) => {
    nodeModules[folder] = `commonjs ${folder}`;
  });

module.exports = {
  entry: "./src/sync/index.js",
  target: "node",
  output: {
    path: path.join(__dirname, "build"),
    filename: "sync.js"
  },
  externals: nodeModules,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};
