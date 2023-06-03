const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  devServer: {
    static: "./dist",
    port: 5000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
