var __karmaWebpackManifest__;
var testsContext;
var runnable;

// we need this to fill in the gap for the missing features for phantomJS
require('phantomjs-polyfill');

require('angular');
require('angular-mocks');
require('app/app.js');

// Using: karma-webpack
//
// // This is the entry file for webpack test
// var testContext = require.context('./app', true, /\.spec\.js/);

// // Get all the files, for each file, call the context function
// // that will require the file and load it up here. Context will
// // loop and require those spec files here
// testContext.keys().forEach(testContext);

// using karma-webpack-with-fast-source-maps

// This gets replaced by karma webpack with the updated files on rebuild
__karmaWebpackManifest__ = [];

// require all modules ending in ".spec.js" from the
// current directory and all subdirectories
testsContext = require.context('./app', true, /\.spec\.js/);

function inManifest(path) {
    return __karmaWebpackManifest__.indexOf(path) >= 0;
}

runnable = testsContext.keys().filter(inManifest);
// Run all tests if we didn't find any changes
if (!runnable.length) {
    runnable = testsContext.keys();
}

runnable.forEach(testsContext);
