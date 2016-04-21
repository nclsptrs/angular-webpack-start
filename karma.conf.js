var webpack = require('webpack');
var packageJson = require('./package.json');
var path = require('path');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: 'tests.bundle.js',
                watched: false
            }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests.bundle.js': ['webpack']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'spec'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage', 'html'],

        htmlReporter: {
            outputDir: 'reports', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'unit-tests', // report summary filename; browser info by default
        },

        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'reports/coverage/'
                }
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS2'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // webpack conf
        // see also: https://www.npmjs.com/package/karma-webpack-with-fast-source-maps
        webpack: {
            resolve: {
                root: __dirname,
                extensions: ['', '.js']
            },
            devtool: 'cheap-module-source-map',
            module: {
                noParse: [
                    /node_modules\//
                ],
                preLoaders: [
                    // instrument only testing sources with Istanbul
                    {
                        test: /\.js$/,
                        loader: 'istanbul-instrumenter',
                        include: [
                            path.resolve('app/components/'),
                            path.resolve('app/common/')
                        ],
                        exclude: [
                            /.spec.js/,
                            /index.js/
                        ]
                    }
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        exclude: [
                            /node_modules/
                        ]
                    },
                    {
                        test: /\.html$/,
                        loader: 'raw',
                        exclude: [
                            /node_modules/
                        ]
                    }
                ]
            },
            stats: {
                colors: true,
                reasons: true,
                errorDetails: true
            },
            debug: false,
            cache: true,
            plugins: [
                new webpack.DefinePlugin({
                    ENV: JSON.stringify('development'),
                    VERSION: JSON.stringify(packageJson.version)
                })
            ]
        },

        webpackMiddleware: {
            noInfo: true
        },

        webpackServer: {
            noInfo: true //don't spam the console when running in karma!
        },

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // to avoid DISCONNECTED messages
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 60000 //default 10000

    });
};
