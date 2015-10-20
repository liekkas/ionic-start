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
        UPLOAD_URL:'http://192.168.95.19:52003'
    };

    var ThreejsSet = {

        CAM: {
            ORTH_NEAR_PLANE: -100,
            ORTH_FAR_PLANE: 100,
            PERP_NEAR_PLANE: 1,
            PERP_FAR_PLANE: 10000,
            FOV: 70,
            ORTHO: false,
            VIEWSIZE: 1000
        },
        SCENE: {
            HELPERS: false,
            AXIS_LENGTH: 50,
            GRID: false,
            GROUND: false
        },
        LIGHTS: {
            DIRECTIONAL: true,
            SPOT: true,
            AMBIENT: true
        },
        DEBUG_MODE: false,
        SAMPLES: {
            GLTFURL : 'sample/duck.json',
            GLTFNAME: 'glTF_Duck',
            JSONURL: 'sample/female.js',
            PLYURL: 'sample/dolphin.ply',
            JSONNAME: 'Textured_Lady',
            OBJURL: 'sample/male02.obj',
            MTLURL: 'sample/male02.mtl',
            OBJNAME: 'No_Texture_Guy',
            OBJMTLNAME: 'Textured_Guy',
            GRIDTEXTURE: 'sample/UV_Grid_Sm.jpg'
        },
        'LOAD_DELAY': 500
    };


    app.constant('Events', Events);
    app.constant('API', API);
    app.constant('Constants', Constants);
    app.constant('ThreejsSet', ThreejsSet);

})(angular.module(APP_NAME));
