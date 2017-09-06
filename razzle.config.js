const razzleHeroku = require("razzle-heroku");
const razzleSass = require("./config/razzle-sass");
const razzleNeoApi = require("./config/razzle-neo-api");

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const herokuConfig = razzleHeroku(config, { target, dev }, webpack);
    const sassConfig = razzleSass(herokuConfig, { target, dev }, webpack);
    const neoApiConfig = razzleNeoApi(sassConfig, { target, dev }, webpack);

    return neoApiConfig;
  }
};
