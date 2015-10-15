/**
 * Created by liekkas on 15/10/15.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function SettingCtrl($state,$rootScope,UserService,Events) {
        //视图模型ViewModel
        var vm = this;

        vm.onLogout = function () {
            UserService.clearUser();
            $rootScope.$emit(Events.USER_LOGOUTED);
            $state.go('login');
            console.log('>>> SettingCtrl:用户退出');
        }
    }

    app.controller('SettingCtrl', SettingCtrl);

})(angular.module(APP_NAME));