/**
 * Created by liekkas on 15/10/13.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function Cache() {
        var cache = {};

        cache.put = function (key, obj) {
            window.localStorage.setItem(key,JSON.stringify(obj));
        };

        cache.get = function (key) {
            return JSON.parse(window.localStorage.getItem(key));
        };

        cache.remove = function (key) {
            return window.localStorage.removeItem(key);
        };

        cache.hasKey = function (key) {
            return window.localStorage.hasOwnProperty(key);
        };

        cache.clear = function () {
            window.localStorage.clear();
        };

        cache.size = function () {
            return window.localStorage.length;
        };

        return cache;
    }

    app.factory('Cache', Cache);

})(angular.module(APP_NAME));