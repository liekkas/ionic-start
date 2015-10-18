/**
 * Created by liekkas on 15/9/27.
 */
(function (app) {
    'use strict';

    app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(false);

        $stateProvider
            .state('login',{
                url: '/login',
                templateUrl: 'login.html',
                controller: 'LoginCtrl as login'
            })
            .state('tab',{
                abstract: true,
                url: '',
                templateUrl: 'tabs.html',
                controller: 'TabCtrl as tab'
            })
            .state('tab.home',{
                url: '/home',
                views: {
                    'conent': {
                        templateUrl: 'tabs-home.html',
                        controller: 'HomeCtrl as home'
                    }
                }

            })
            .state('tab.cart',{
                url: '/cart',
                views: {
                    'conent': {
                        templateUrl: 'tabs-cart.html',
                        controller: 'CartCtrl as cart'
                    }
                }

            })
            .state('tab.model',{
                url: '/model',
                views: {
                    'conent': {
                        templateUrl: 'tabs-model.html',
                        controller: 'ModelCtrl as model'
                    }
                }

            })
            .state('tab.profile',{
                url: '/profile',
                views: {
                    'conent': {
                        templateUrl: 'tabs-profile.html',
                        controller: 'ProfileCtrl as profile'
                    }
                }
            })
            .state('message',{
                url: '/message',
                templateUrl: 'profile/message.html'
            })
            .state('coupon',{
                url: '/profile/coupon',
                templateUrl: 'profile/coupon.html'
            })
            .state('collection',{
                url: '/profile/collection',
                templateUrl: 'profile/collection.html'
            })
            .state('orders',{
                url: '/profile/orders',
                templateUrl: 'profile/orders.html'
            })
            .state('logistics',{
                url: '/message/logistics',
                templateUrl: 'profile/logistics.html'
            })
            .state('sales-promotion',{
                url: '/message/sales-promotion',
                templateUrl: 'profile/sales-promotion.html'
            })
            .state('profile-account',{
                url: '/profile/account',
                templateUrl: 'profile/account-info.html',
                controller: 'AccountInfoCtrl as ai'
            })
            .state('edit-profile-img',{
                url: '/profile/account/profileimg',
                templateUrl: 'profile/edit-profile-img.html'
            })
            .state('edit-nickname',{
                url: '/profile/account/nickname',
                templateUrl: 'profile/edit-nickname.html'
            })
            .state('edit-password',{
                url: '/profile/account/password',
                templateUrl: 'profile/edit-password.html'
            })
            .state('edit-phone',{
                url: '/profile/account/phone',
                templateUrl: 'profile/edit-phone.html'
            })
            .state('profile-setting',{
                url: '/profile/setting',
                templateUrl: 'profile/setting.html',
                controller: 'SettingCtrl as set'
            })
            .state('about',{
                url: '/profile/setting/about',
                templateUrl: 'profile/setting-about.html'
            })
            .state('advise',{
                url: '/profile/setting/advise',
                templateUrl: 'profile/setting-advise.html'
            })
        ;

        $urlRouterProvider
            .otherwise('/home');
    });

})(angular.module(APP_NAME));
