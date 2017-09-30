const razzleHeroku = require("razzle-heroku");
const razzleSass = require("./config/razzle-sass");
const razzleInlineSvg = require("./config/razzle-inline-svg");
const razzleRemoveSourceMaps = require("./config/razzle-remove-source-maps");

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    let appConfig = config;

    appConfig = razzleHeroku(appConfig, { target, dev }, webpack);
    appConfig = razzleSass(appConfig, { target, dev }, webpack);
    appConfig = razzleInlineSvg(appConfig, { target, dev }, webpack);
    appConfig = razzleRemoveSourceMaps(appConfig, { target, dev }, webpack);

    return appConfig;
  }
};
