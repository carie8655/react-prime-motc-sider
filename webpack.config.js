const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("lib"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  // prettier-ignore
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      lodash: path.resolve(__dirname, "./node_modules/lodash"),
      "prop-types": path.resolve(__dirname, "./node_modules/prop-types"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      primereact: path.resolve(__dirname, "./node_modules/primereact"),
      primeicons: path.resolve(__dirname, "./node_modules/primeicons"),
      primeflex: path.resolve(__dirname, "./node_modules/primeflex"),
      "@fortawesome/fontawesome-svg-core": path.resolve(__dirname, "./node_modules/@fortawesome/fontawesome-svg-core"),
      "@fortawesome/free-regular-svg-icons": path.resolve(__dirname, "./node_modules/@fortawesome/free-regular-svg-icons"),
      "@fortawesome/free-solid-svg-icons": path.resolve(__dirname, "./node_modules/@fortawesome/free-solid-svg-icons"),
      "@fortawesome/react-fontawesome": path.resolve(__dirname, "./node_modules/@fortawesome/react-fontawesome"),
      moment: path.resolve(__dirname, "./node_modules/moment"),
    },
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
};
