const _ = require("lodash");
const fileLoader = require.resolve("file-loader");

module.exports = (config) => {
  // exclude svg from default file loader config
  const existingRule = _.find(config.module.rules, (rule) => {
    return rule.loader === fileLoader;
  });

  if (existingRule) {
    existingRule.exclude.push(/\.svg$/);
  }

  // include custom svg loader
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "svg-inline-loader"
      }
    ]
  });

  return config;
};
