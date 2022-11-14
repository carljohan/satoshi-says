const path = require('path');
const Webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')







module.exports = {
    entry: ['react-hot-loader/patch', './client/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'happypack/loader?id=js', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'happypack/loader?id=js', exclude: /node_modules/ },
            {test:/\.css$/, loader: 'happypack/loader?id=css'},
            { test: /\.(png|jp(e*)g|svg|ico)$/, loader: {
               loader: 'url-loader',
               options: {
                   limit: 8000, // Convert images < 8kb to base64 strings
                   name: 'images/[hash]-[name].[ext]'
               }
           }
        }
        ]
        
    },
    plugins: [
        HtmlWebpackPluginConfig,        
        new Webpack.DefinePlugin({
            "process.env": {
            NODE_ENV: JSON.stringify("development")
            } 
        }),
        new HappyPack({
            id: 'js',
            threads: 4,
            loaders: ['babel-loader'],
        }),
        new HappyPack({
            id: 'css',
            threads: 4,
            loaders: ['style-loader', { loader: 'css-loader', options: { minimize: true }}],
        }),
        new HappyPack({
            id: 'url',
            threads: 4,
            loaders: [{
               loader: 'url-loader',
               options: {
                   limit: 8000, // Convert images < 8kb to base64 strings
                   name: 'images/[hash]-[name].[ext]'
               }
           }],
        }),
        new WebappWebpackPlugin('./fav.png'),
        new Webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin()

        
    ],
    devServer: {                
        hot: true,
        inline: true,
        port: 8080,        
        historyApiFallback: true,                
    },
}