/**
 * Created by liekkas on 15/9/25.
 */
var APP_NAME = 'app'; //应用名称
var requires = [    //依赖关系
    'ionic',
    'templates',
    'ngCordova'
];

var Viewer={}; //threejs呈现器

angular.module(APP_NAME,requires);
