const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

output: {
  filename: "main.js",
  path: path.resolve(__dirname, "docs"),
  clean: true,
},

  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
};