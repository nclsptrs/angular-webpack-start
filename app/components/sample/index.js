var angular = require('angular');
var uiRouter = require('angular-ui-router');

var SampleController = require('./sample.ctrl.js');

module.exports = angular.module('components.sample', [
    uiRouter,
])
.config(
    /*@ngInject*/
    function ($stateProvider) {
        $stateProvider.state('sample', {
            title: 'sample',
            url: '/sample',
            template: require('./sample.html'),
            controller: SampleController,
            controllerAs: 'vm',
        });
    }
)
.name;
