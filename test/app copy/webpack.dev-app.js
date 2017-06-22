const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const projectRoot = path.resolve(__dirname, '../../')
const version = process.env.VERSION || require('../../package.json').version
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
  entry: './test/app/src/main.js', //app: process.argv.indexOf('--docs') > 0 ? './docs/docs.js' : './src/dev.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          use: ['eslint-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        }),
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),
    new ExtractTextPlugin('vuetify.min.css')
  ]
}
