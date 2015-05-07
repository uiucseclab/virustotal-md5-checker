var app = angular.module('app', [
    'ngRoute', 
    'appControllers', 
    'appServices',
    'appDirectives'
]);


app.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomepageController'
        })
        .when('/request/:requestId', {
            templateUrl: 'partials/request.html',
            controller: 'RequestController'
        })
        .when('/scan/:scanId', {
            templateUrl: 'partials/scan.html',
            controller: 'ScanController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);


app.run([
    '$window',
    function($window) {
        $window.sessionStorage.user = '';
    }
]);