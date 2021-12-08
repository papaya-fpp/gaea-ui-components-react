const path = require("path");

module.exports = {
  entry: {
    index: './components/index.tsx',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'./dist'),
    libraryTarget: "umd"
  },
  devtool: "cheap-module-source-map", 
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
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    symlinks:false
  },
  externals: {
      "react": "react",
      "react-dom": "ReactDOM"
  }
};