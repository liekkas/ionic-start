/**
 * Created by liekkas on 15/10/13.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function Cache() {
        var dict = {};
        var cache = {};
        cache.put = function (key, obj) {
            dict[key] = obj;
        };

        cache.get = function (key) {
            return dict[key];
        };

        cache.hasKey = function (key) {
            return dict.hasOwnProperty(key);
        };
        return cache;
    }

    app.factory('Cache', Cache);

})(angular.module(APP_NAME));