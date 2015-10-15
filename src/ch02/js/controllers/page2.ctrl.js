/**
 * Created by liekkas on 15/10/13.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function Page2Ctrl(Cache,UserService,$scope,$ionicScrollDelegate) {
        //视图模型ViewModel
        var vm = this;

        if(Cache.hasKey('users')){
            vm.users = JSON.parse(Cache.get('users'));
            console.log(">>> use cache");
        }else{
            UserService.getUsers().then(function (users) {
                vm.users = users;
                Cache.put('users',JSON.stringify(users));
                $ionicScrollDelegate.resize();
            });
            console.log(">>> no cache");
        }

        vm.loadMore = function () {
            UserService.getUsers().then(function (users) {
                vm.users = vm.users.concat(users);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        vm.clear = function () {
            Cache.clear();
        };
    }

    app.controller('Page2Ctrl', Page2Ctrl);

})(angular.module(APP_NAME));