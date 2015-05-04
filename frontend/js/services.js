var appServices = angular.module('appServices', []);


appServices.factory('Scans', [
    '$http',
    'baseUrl',
    function($http, baseUrl) {
        var getUrl = function(id) {
            return baseUrl + '/api/scans' + (id ? '/' + id: '');
        };

        return {
            get: function(params) {
                return $http.get(getUrl(), {
                    params: params
                });
            },
            create: function(data) {
                return $http.post(getUrl(), data);
            },
            getOne: function(id) {
                return $http.get(getUrl(id));
            },
            update: function(id, data) {
                return $http.put(getUrl(id), data);
            },
            delete: function(id) {
                return $http.delete(getUrl(id));
            }
        };
    }
]);