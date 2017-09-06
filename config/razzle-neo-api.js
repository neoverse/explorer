const path = require("path");

module.exports = (config, { target, dev }, webpack) => {
  config.module.rules.push({
    test: /\.js$/,
    include: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../node_modules/neo-api-js")
    ],
    loader: "babel-loader"
  });

  return config;
};
