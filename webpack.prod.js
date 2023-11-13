const config = require("./webpack.config");
const Dotenv = require("dotenv-webpack")

module.exports = {
  ...config,
  mode: "production",
  plugins: [
    new Dotenv()
  ]
};