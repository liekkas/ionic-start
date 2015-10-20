/**
 * Created by liekkas on 15/10/14.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function LoginCtrl($state,$rootScope,Constants,Events,UserService) {
        //视图模型ViewModel
        var vm = this;

        vm.user = 'demo';
        vm.pwd = 'demo';
        vm.isLoginError = false;

        vm.onLogin = function () {
            if(UserService.authConfirm(vm.user,vm.pwd)){
                console.log('>>> LoginCtrl:用户登录');

                vm.isLoginError = false;
                var user = {
                    name: 'demo',
                    nickname: '斜风细雨',
                    pwd: 'demo',
                    profile_img: 'assets/images/profile.jpg',
                    phone: '18610241086'
                };
                UserService.saveUser(user);
                $rootScope.$emit(Events.USER_LOGINED,user);
                //$state.go($rootScope[Constants.PREVENT_STATE]);
                $state.go('tab.profile');
            }else{
                vm.isLoginError = true;
                console.log(">>> no: user: "+vm.user);
            }
        }
    }

    app.controller('LoginCtrl', LoginCtrl);

})(angular.module(APP_NAME));