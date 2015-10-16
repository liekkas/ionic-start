/**
 * Created by liekkas on 15/10/16.
 */

(function (app) {
    'use strict';

    /* @ngInject */
    function TabCtrl($state,$rootScope,Constants) {
        //视图模型ViewModel
        var vm = this;

        //vm.selectState = $rootScope[Constants.CURRENT_STATE];
        vm.selectState = 'tab.home';

        vm.changeState = function (toState) {
            vm.selectState = toState;
            $state.go(toState);
        }
    }

    app.controller('TabCtrl', TabCtrl);

})(angular.module(APP_NAME));