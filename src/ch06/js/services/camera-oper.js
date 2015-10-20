/**
 * Created by liekkas on 15/10/19.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function CameraOper($window) {

        return {
            getPicture: function (onSuccess,onFail,options) {
                console.log('Camera getPicture');
                $window.alert('get picture');
                //var q = $q.defer();
                navigator.camera.getPicture(
                    onSuccess,onFail, options);
            },
            cleanUp:function(){
                navigator.camera.cleanup(onSuccess, onFail);

                function onSuccess() {
                    console.log("Camera cleanup success.")
                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            },
            backgroundVideo:function() {
                console.log('take video');
                if(window.Plugin){
                    $window.alert('take video window.Plugin.backgroundvideo'+window.Plugin.backgroundvideo);
                    window.Plugin.backgroundvideo.start('myvideo', 'front', null, null);
                }
            }
        }
    }

    app.factory('CameraOper', CameraOper);

})(angular.module(APP_NAME));