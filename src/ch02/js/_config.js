/**
 * Created by liekkas on 15/9/27.
 */
(function (app) {
    'use strict';

    //路由设置
    var config = {
        main : {
            url: '/main',
            templateUrl: 'main.html',
            controller: 'MainCtrl'
        },

        page2 : {
            url: '/page2',
            templateUrl: 'page2.html',
            controller: 'Page2Ctrl as p2'

        }
    };

    app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
        //$ionicConfigProvider.scrolling.jsScrolling(false);

        $stateProvider
            .state('main',config.main)
            .state('page2', config.page2)
        ;

        $urlRouterProvider
            .otherwise('/main');
    });

})(angular.module(APP_NAME));
