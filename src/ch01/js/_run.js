/**
 * Created by liekkas on 15/9/27.
 */
(function (app) {
    'use strict';

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

    app.run(onReady);

})(angular.module(APP_NAME));
