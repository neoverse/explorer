const path = require("path");
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

  const sassLoader = {
    loader: "sass-loader",
    options: {
      includePaths: [
        path.resolve(__dirname, "../node_modules")
      ]
    }
  };

  config.module.rules.push({
    test: /\.scss$/,
    use: isServer ? ["css-loader", sassLoader] : (
      dev ? [
        "style-loader",
        {
          loader: "css-loader",
          options: { modules: false, sourceMap: true }
        },
        postCssLoader,
        sassLoader
      ] : ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          postCssLoader,
          sassLoader
        ]
      })
    )
  });

  if (!isServer && !dev) {
    config.plugins.push(new ExtractTextPlugin("static/css/[name].[contenthash:8].css"));
  }

  return config;
};
