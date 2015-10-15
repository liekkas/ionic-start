/**
 * Created by liekkas on 15/9/27.
 */
(function (app) {
    'use strict';

    app.run(onReady);
    app.run(stateChanged);
    app.run(loginChanged);

    /**
     * @ngInject
     */
    function onReady($ionicPlatform) {

      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    }

    /**
     * 动态跟踪应用状态
     */
    function stateChanged($rootScope,Constants) {

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            $rootScope[Constants.PREVENT_STATE] = $rootScope[Constants.CURRENT_STATE];
            $rootScope[Constants.CURRENT_STATE] = toState;
        });
    }
    /**
     * 登入等出
     */
    function loginChanged($rootScope,Constants,Events) {

        $rootScope.$on(Events.USER_LOGINED, function(user) {
            $rootScope[Constants.CURRENT_USER] = user;
            console.log('>>> $rootScope:收到用户登录');

        });

        $rootScope.$on(Events.USER_LOGOUTED, function() {
            $rootScope[Constants.CURRENT_USER] = null;
            console.log('>>> $rootScope:收到用户退出');
        });
    }



})(angular.module(APP_NAME));
