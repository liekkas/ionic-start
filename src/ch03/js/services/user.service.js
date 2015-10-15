/**
 * Created by liekkas on 15/10/13.
 */

(function (app) {
    'use strict';

    /* @ngInject */
    function UserService($q,$http,AppSettings) {
        var service = {};

        service.getUsers = function() {
            var deferred = $q.defer();
            console.time('getUserCosts');
            $http.get(AppSettings.REST_API.users)
                .success(function (data) {
                    deferred.resolve(data.results);
                    console.timeEnd('getUserCosts');
                }).error(function (error, status) {
                    deferred.reject(error,status);
                });
            return deferred.promise;
        };

        return service;
    }

    app.service('UserService', UserService);

})(angular.module(APP_NAME));