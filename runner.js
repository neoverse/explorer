#!/usr/bin/env node

/* eslint-disable no-console, no-sync */

const fs = require("fs");
const webpack = require("webpack");
const load = require("webpack-to-memory");

function getNodeModules() {
  const nodeModules = {};

  fs.readdirSync("node_modules")
    .filter((folder) => {
      return [".bin"].indexOf(folder) === -1;
    })
    .forEach((folder) => {
      nodeModules[folder] = `commonjs ${folder}`;
    });

  return nodeModules;
}

function getWebpackConfig(filename) {
  return {
    entry: filename,
    target: "node",
    externals: getNodeModules(),
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }]
    }
  };
}

load(webpack(getWebpackConfig(process.argv[2])))
  .catch((errors) => {
    console.error(errors[0]);
  });
