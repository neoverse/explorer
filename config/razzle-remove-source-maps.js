module.exports = (config, { target, dev }, webpack) => {
  if (!dev) config.devtool = "nosources-source-map";
  return config;
};
