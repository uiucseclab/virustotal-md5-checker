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