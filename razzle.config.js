const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const razzleHeroku = require("razzle-heroku");

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const appConfig = razzleHeroku(config, { target, dev }, webpack);
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

    appConfig.module.rules.push({
      test: /\.scss$/,
      use: isServer ? "css-loader" : (
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
      appConfig.plugins.push(new ExtractTextPlugin("static/css/[name].[contenthash:8].css"));
    }

    // needed for ES6 modules like neo-api-js
    appConfig.module.rules.push({
      test: /\.js$/,
      loader: "babel-loader"
    });

    return appConfig;
  }
};
