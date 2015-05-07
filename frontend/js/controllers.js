var appControllers = angular.module('appControllers', []);


appControllers.controller('HomepageController', [
    '$scope',
    'Requests',
    function($scope, Requests) {
        $scope.md5s = '';
        $scope.message = '';
        $scope.request = null;

        $scope.submitForm = function() {
            $scope.request = null;

            var md5Array = $scope.md5s.split(/[;, \n\t]+/);
            var validMd5s = md5Array.filter(function(s) { return s.match(/[a-fA-F0-9]{32}/); });
            console.log(validMd5s);
            var items = [];
            for (var i = 0; i < validMd5s.length; i++) {
                items.push({
                    md5: validMd5s[i]
                });
            }
            console.log(items);

            var newRequest = {
                items: items
            }
            console.log(newRequest);

            Requests.create(newRequest).success(function(data) {
                $scope.request = data.data;
                $scope.message = data.message;
            }).error(function(data) {
                console.log('Error creating request');
                $scope.message = 'Error encountered while creating request';
            });
        };
    }
]);

appControllers.controller('RequestController', [
    '$scope',
    '$routeParams',
    'Requests',
    'Scans',
    function($scope, $routeParams, Requests, Scans) {
        var requestId = $routeParams.requestId;

        $scope.request = null;
        $scope.error = false;

        Requests.getOne(requestId).success(function(data) {
            var request = data.data;
            var items = request.items;

            Scans.get({
                where: { _id: { $in: items } }
            }).success(function(data) {
                console.log('Loaded scans');
                $scope.error = false;
                $scope.request = request;
                $scope.request.scans = data.data;
            }).error(function(data) {
                console.log('Failed to load scans');
                $scope.error = true;
            });
        }).error(function(data) {
            console.log('Could not find request');
            $scope.error = true;
        });
    }
]);

appControllers.controller('ScanController', [
    '$scope',
    '$routeParams',
    'Scans',
    function($scope, $routeParams, Scans) {
        var scanId = $routeParams.scanId;

        $scope.scan = null;
        $scope.error = false;

        Scans.getOne(scanId).success(function(data) {
            console.log('Loaded scan');
            $scope.error = false;
            $scope.scan = data.data;
        }).error(function(data) {
            console.log('Could not find scan');
            $scope.error = true;
        });
    }
]);