const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {entryPath} = require('./entryPath');

module.exports = {
  entry: './components/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'../dist'),
    libraryTarget: "umd"
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      symlinks:false
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|.tsx)?$/,
        use: [
          { 
            loader: 'babel-loader', 
            options: {
              presets: ['@babel/react', '@babel/preset-env']
            }
          },
          "ts-loader"
        ],
        exclude: /(node_modules)/
      },
      {
        test: /.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          // "style-loader",
          "css-loader",
          // "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "[id].css"
    }),
  ],
  externals: {
      "react": "react",
      "react-dom": "ReactDOM"
  }
};