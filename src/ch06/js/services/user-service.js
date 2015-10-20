/**
 * Created by liekkas on 15/10/13.
 */

(function (app) {
    'use strict';

    /* @ngInject */
    function UserService($q,$http,Constants,Cache) {
        var service = {};

        //用户登录验证
        service.authConfirm = function (name, pwd) {
            return (name === 'demo' && pwd === 'demo');
        };

        service.saveUser = function (user) {
            Cache.put(Constants.CURRENT_USER,user);
        };

        service.getCurrentUser = function () {
            var user = Cache.get(Constants.CURRENT_USER);
            if(angular.isUndefined(user)){
                return null;
            }
            return user;
        };

        //清除用户
        service.clearUser = function () {
            Cache.remove(Constants.CURRENT_USER);
        };

        service.getUsers = function() {
            var deferred = $q.defer();
            console.time('getUserCosts');
            $http.get(Constants.REST_API.users)
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