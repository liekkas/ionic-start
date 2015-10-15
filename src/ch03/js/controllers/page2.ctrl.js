/**
 * Created by liekkas on 15/10/13.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function Page2Ctrl(Cache,UserService,Loki) {
        //视图模型ViewModel
        var vm = this;

        var db = new Loki('test.json');
        var db_users = db.addCollection('users');

        if(db_users.data.length > 0){
            vm.users = db_users.data;
            console.log(">>> use cache");
        }else{
            UserService.getUsers().then(function (users) {
                vm.users = users;
                angular.forEach(users, function (user) {
                    db_users.insert(user);
                });

                db.saveDatabase();
                //Cache.put('users',users);
            });
            console.log(">>> no cache");
        }

    }

    app.controller('Page2Ctrl', Page2Ctrl);

})(angular.module(APP_NAME));