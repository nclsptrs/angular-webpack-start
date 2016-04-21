var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJson = require('./package.json');

module.exports = function webpackConfigFactory(environment) {
    var config = {
        entry: [
            path.resolve(__dirname, 'app', 'index.js')
        ],
        output: {
            path: path.resolve(__dirname, 'app', 'build'),
            filename: 'bundle.js'
        },
        module: {
            preLoaders: [],
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'ng-annotate!babel',
                    exclude: /(node_modules)/
                },
                {
                    test: /\.html$/,
                    loader: 'raw'
                },
                {
                    test: /\.scss$/,
                    loader: (environment === 'development')
                        ? 'style!css!sass'
                        : ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
                },
                {
                    test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/octet-stream'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=image/svg+xml'
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=10000'
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash'
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(environment),
                VERSION: JSON.stringify(packageJson.version)
            })
        ]
    };


    switch (environment) {
        case 'production':
        case 'staging':
            config.devtool = 'source-map';
            config.entry = {
                bundle: './app/index.js',
                vendor: [
                    'angular',
                    'angular-toastr',
                    'angular-ui-router',
                    'angular-ui-bootstrap',
                    'lodash'
                ]
            };
            config.output.path = __dirname + '/dist/build';
            config.output.filename = '[name]-[hash].js';
            config.module.preLoaders = []; // remove ESLint
            config.plugins.push(new webpack.NoErrorsPlugin());
            config.plugins.push(new ExtractTextPlugin('bundle-[hash].css'));
            config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
            config.plugins.push(new webpack.optimize.DedupePlugin());
            config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
            config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
            config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }));
            break;

        case 'development':
            // For options, see http://webpack.github.io/docs/configuration.html#devtool
            config.devtool = 'eval';
            config.output.publicPath = 'build/';

            // WDS
            config.entry.push('webpack/hot/dev-server');
            config.entry.push('webpack-dev-server/client?http://localhost:8000');

            // ESLint
            config.module.preLoaders.push({
                test: /\.js$/,
                loader: 'eslint',
                exclude: /(node_modules)/
            });

            config.plugins.push(new webpack.HotModuleReplacementPlugin());
            config.cache = true;
            config.debug = true;

            // setup for webpack-dev-server
            config.devServer = {
                port: 8000,
                // root folder to serve the app
                contentBase: './app',
                // Enable Hot Module Replacement
                hot: true,
                // To support html5 router.
                historyApiFallback: false,
                // Suppress boring information.
                noInfo: true,
                // Proxy api to API Server
                proxy: {
                    '/api/*': 'http://localhost/'
                },
                // Limit logging
                stats: {
                    version: false,
                    colors: true,
                    chunks: false,
                    children: false
                },
                publicPath: '/' + config.output.publicPath
            };
            break;

        default: process.stdout.write('Unknown or undefined NODE_ENV. Please refer to package.json for available build commands.' + '\n');
    }

    return config;

};
