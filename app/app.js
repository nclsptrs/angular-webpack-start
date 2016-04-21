var angular = require('angular');
var uiBootstrap = require('angular-ui-bootstrap');
var uiRouter = require('angular-ui-router');
var toastr = require('angular-toastr');

var common = require('./common');
var components = require('./components');

var app = function () {
    return {
        restrict: 'E',
        template: require('./app.html')
    };
};

angular.module('app', [
    uiBootstrap,
    uiRouter,
    toastr,
    common,
    components
])
.constant('config', {
    version: VERSION,	/* injected by webpack */	// eslint-disable-line  no-undef
    env: ENV,			/* injected by webpack */	// eslint-disable-line  no-undef
    baseUrl: '/api'
})
.directive('app', app)
.config(defaultRoute);

/*@ngInject*/
function defaultRoute($urlRouterProvider) {
    $urlRouterProvider.otherwise('sample');
}
