/**
 * Created by liekkas on 15/10/19.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function ModelShowCtrl(ViewerFactory,EventBus) {
        //视图模型ViewModel
        var vm = this;

        ViewerFactory.init({
            canvasId: 'viewer',
            containerId: 'container'
        });

        EventBus.onMsg('appReady', function () {
            loadSample();
        });

        function loadSample() {

            var info = {
                'obj': 'assets/models/head.obj',
                'name': 'head',
                'type': 'obj'
            };

            ViewerFactory.loadOBJ(info);
            var glassInfo = {
                'obj':'assets/models/glasses/Yj.obj',
                'mtl':'assets/models/glasses/Yj.mtl',
                'name':'glasses_1',
                'rotateX':'0',
                'rotateY':'180',
                'rotateZ':'0',
                'positionX':'0',
                'positionY':'1.8',
                'positionZ':'8',
                'scale':'10'
            };
            ViewerFactory.loadOBJMTL(glassInfo);

        }

        // default data for the input fields
        vm.data = {
            'scale': 1,
            'rotateX': 0,
            'rotateY': 0,
            'rotateZ': 0,
            'positionX': 0,
            'positionY': 0,
            'positionZ': 0
        };


        /**
         * Scale the model.
         */
        vm.scale = function () {
            ViewerFactory.scale(this.data.scale);
        };

        /**
         * Rotate around an axis
         */
        vm.rotate = function () {
            ViewerFactory.rotate(
                parseFloat(this.data.rotateX),
                parseFloat(this.data.rotateY),
                parseFloat(this.data.rotateZ))
        };

        /**
         * Translate around the scene
         */
        vm.translate = function () {
            ViewerFactory.translate(
                parseFloat(this.data.positionX),
                parseFloat(this.data.positionY),
                parseFloat(this.data.positionZ))
        };

    }

    app.controller('ModelShowCtrl', ModelShowCtrl);

})(angular.module(APP_NAME));