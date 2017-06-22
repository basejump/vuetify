const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const projectRoot = path.resolve(__dirname, '../../')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

const testAppSrc = './test/app/'
const entries = {}
const chunks = []
glob.sync(testAppSrc + 'pages/**/main.js').forEach(path => {
  const chunk = path.split(testAppSrc + 'pages/')[1].split('/main.js')[0]
  entries[chunk] = path
  chunks.push(chunk)
})
entries['home'] = testAppSrc + 'main.js'

const config = {
  entry: entries, // entry: './test/app/src/main.js', //app: process.argv.indexOf('--docs') > 0 ? './docs/docs.js' : './src/dev.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js',
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
      'vue$': 'vue/dist/vue.esm.js',
      vuetify: path.resolve(__dirname, '../../src/index.js') // '../../dist/vuetify.js' // we should be able to have this work from dist based on a flag too
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
    new ExtractTextPlugin('vuetify.min.css'),
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: testAppSrc + 'index.html',
      chunks: ['vendors', 'home'],
      inject: true
    })
  ]
}

glob.sync(testAppSrc + 'pages/**/*.html').forEach(path => {
  const chunk = path.split(testAppSrc + 'pages/')[1].split('/index.html')[0]
  const filename = chunk + '/index.html'
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    favicon: testAppSrc + 'assets/logo.png',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})
//add the root index.html

module.exports = config
