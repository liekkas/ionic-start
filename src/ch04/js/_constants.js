/**
 * Created by liekkas on 15/9/27.
 */
(function (app) {
    'use strict';

    var Constants = {

        //---------$rootScope附属的属性------------
        CURRENT_USER: 'current_user', //当前用户
        PREVENT_STATE: 'prevent_state', //前一个路由状态
        CURRENT_STATE: 'current_state', //当前路由状态


        //---------$rootScope附属的属性------------
        REST_API : {
            users : 'https://randomuser.me/api/?results=10'
        }

    };

    var Events = {
        USER_LOGINED: 'event_user_logined',
        USER_LOGOUTED: 'event_user_logouted'
    };

    var API = {

    };

    app.constant('Events', Events);
    app.constant('Constants', Constants);

})(angular.module(APP_NAME));
