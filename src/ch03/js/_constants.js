/**
 * Created by liekkas on 15/9/27.
 */
(function (app) {
    'use strict';

    var AppSettings = {

        REST_API : {
            users : 'https://randomuser.me/api/?results=100'
        }

    };

    app.constant('AppSettings', AppSettings);

})(angular.module(APP_NAME));
