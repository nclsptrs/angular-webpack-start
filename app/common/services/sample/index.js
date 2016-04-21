var angular = require('angular');
var sampleService = require('./sample.svc.js');

module.exports = angular.module('app.common.services.sample', []).service('sampleService', sampleService).name;
