var angular = require('angular');
var directives = require('./directives');
var services = require('./services');

module.exports = angular.module('app.common', [
    directives,
    services
]).name;
