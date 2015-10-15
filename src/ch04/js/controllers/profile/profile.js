/**
 * Created by liekkas on 15/10/14.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function ProfileCtrl($rootScope,Constants,Events,UserService) {
        //视图模型ViewModel
        var vm = this;
        vm.user = UserService.getCurrentUser();

        $rootScope.$on(Events.USER_LOGINED, function(event,user) {
            $rootScope[Constants.CURRENT_USER] = user;
            console.log('>>> ProfileCtrl:收到用户登录');
            vm.user = user;
        });

        $rootScope.$on(Events.USER_LOGOUTED, function() {
            $rootScope[Constants.CURRENT_USER] = null;
            console.log('>>> ProfileCtrl:收到用户退出');
            vm.user = null;
        });

        vm.jump = function (state) {
            return vm.user === null ? 'login' : state;
        };

        console.log(vm.user);
    }

    app.controller('ProfileCtrl', ProfileCtrl);

})(angular.module(APP_NAME));