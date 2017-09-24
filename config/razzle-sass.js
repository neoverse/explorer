const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (config, { target, dev }, _webpack) => {
  const isServer = target !== "web";

  const postCssLoader = {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [
        autoprefixer({
          browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9"
          ]
        })
      ]
    }
  };

  config.module.rules.push({
    test: /\.scss$/,
    use: isServer ? ["css-loader", "sass-loader"] : (
      dev ? [
        "style-loader",
        {
          loader: "css-loader",
          options: { modules: false, sourceMap: true }
        },
        postCssLoader,
        "sass-loader"
      ] : ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          postCssLoader,
          "sass-loader"
        ]
      })
    )
  });

  if (!isServer && !dev) {
    config.plugins.push(new ExtractTextPlugin("static/css/[name].[contenthash:8].css"));
  }

  return config;
};
