var angular = require('angular');
var sample = require('./sample.dir.js');

module.exports = angular.module('app.common.directives.sample', []).directive('sampleDir', sample).name;
