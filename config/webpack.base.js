const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {entryPath} = require('./entryPath');

module.exports = {
  entry: {
    index: './components/index.tsx',
    // ...entryPath('./components')
  },
  output: {
    // filename: (pathData) => {
    //   return pathData.chunk.name === 'index' ? '[name].js' : '[name]/index.js';
    // },
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
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  externals: {
      "react": "react",
      "react-dom": "ReactDOM"
  }
};