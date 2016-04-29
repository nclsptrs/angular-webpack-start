var angular = require('angular');
var sample = require('./sample');

module.exports = angular.module('app.common.services', [
    sample,
]).name;
