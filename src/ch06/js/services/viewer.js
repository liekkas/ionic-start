/**
 * Created by liekkas on 15/10/19.
 */
(function (app) {
    'use strict';

    app.factory('Viewer', Viewer);

    /* @ngInject */
    function Viewer(ThreejsSet) {

        var Viewer = {};

        Viewer.Scene = function (params) {

            this.parentContainer = $('#' + params.containerId);
            this.container = document.getElementById(params.canvasId);
            this.jqContainer = $('#' + params.canvasId);

            this.context = params.context;

            this.WIDTH = this.container.width;
            this.HEIGHT = this.container.height;

            this.wrangler = null;
            this.scene = null;
            // this.projector = null;
            this.renderer = null;
            this.setup = null;
            this.cameras = null;
            this.controls = null;
            this.raycaster = null;

            this.init();

        };

        Viewer.Scene.prototype = {

            init: function () {

                var params = {context: this};

                this.scene = new THREE.Scene();
                //this.projector = new THREE.Projector();
                this.renderer = new THREE.WebGLRenderer({canvas: this.container, antialias: true});
                //this.renderer.setClearColorHex(0xff0000, 1.0);
                this.wrangler = new Viewer.Wrangler(params);
                this.setup = new Viewer.Scene.Setup(params);
                this.cameras = new Viewer.Scene.Cameras(params);
                this.controls = new THREE.OrbitControls( this.cameras.liveCam, this.container );
                this.raycaster = new THREE.Raycaster();
                this.wrangler.init();
                this.listeners();
            },


            listeners: function () {
                var to = null;
                window.addEventListener( 'resize', function(){

                    // if timeout already set, clear it so you can set a new one
                    // this prevents N resize events from resizing the canvas
                    if(to){
                        clearTimeout(to);
                    }
                    to = setTimeout(function () {
                        this.onWindowResize();
                    }.bind(this), 100);
                }.bind(this), false );
            },

            /**
             * Resizes the camera when document is resized.
             */
            onWindowResize: function () {

                this.WIDTH = window.innerWidth;
                this.HEIGHT = window.innerHeight;
                this.cameras.liveCam.aspect = this.WIDTH / this.HEIGHT;
                this.cameras.liveCam.updateProjectionMatrix();
                this.renderer.setSize(this.WIDTH, this.HEIGHT);
                this.renderer.setViewport(0, 0, this.WIDTH, this.HEIGHT);
            }
        };

        /**
         * Setup the scene geometry
         * @param {Object} params
         * @constructor
         */
        Viewer.Scene.Setup = function (params) {

            this.context = params.context;

            this.axisHelper = null;

            this.WIDTH = this.context.container.clientWidth;
            this.HEIGHT = this.context.container.clientHeight;

            this.init();
        };

        /**
         *
         */
        Viewer.Scene.Setup.prototype = {

            /**
             * Initialize all of the THREE.JS framework
             */
            init: function () {
                this.setupRenderer();
                this.lights();
                this.createGeometry();
                if(ThreejsSet.SCENE.HELPERS){
                    this.helpers();
                }
            },

            /**
             * Add scene helpers
             */
            helpers: function () {
                this.axisHelper = new THREE.AxisHelper(ThreejsSet.SCENE.AXIS_LENGTH);
                this.axisHelper.position.setZ(5);
                this.axisHelper.name="axishelper";
                this.context.scene.add(this.axisHelper);
            },

            /**
             * Setup the render information.
             */
            setupRenderer: function () {
                this.context.renderer.setSize(this.WIDTH, this.HEIGHT);
                this.context.renderer.setViewport(0, 0, this.WIDTH, this.HEIGHT);
                this.context.jqContainer.fadeIn();
            },

            /**
             * Add light(s) to the scene
             */
            lights: function () {
                var dl1 = new THREE.DirectionalLight( 0xdddddd );
                dl1.position.set( 0, -1, 100 ).normalize();
                dl1.name="light";
                //this.context.scene.add( dl1 );

                var spot1   = new THREE.SpotLight( 0xffffff, 1 );
                spot1.position.set( -300, 600, 300 );
                spot1.target.position.set( 0, 0, 0 );
                spot1.name = "light";
                this.context.scene.add( spot1 );

                var ambient = new THREE.AmbientLight( 0x444444 );
                ambient.name="ambient";
                this.context.scene.add( ambient );

                var dl2 = new THREE.DirectionalLight( 0xffeedd );
                dl2.position.set( 0, 0, 100 ).normalize();
                ambient.name="dl2";
                //this.context.scene.add( dl2 );

            },

            /**
             * Add supporting geometry to the scene.
             */
            createGeometry: function () {
                if(ThreejsSet.SCENE.GROUND) {
                    this.createGround();
                }
                if(ThreejsSet.SCENE.GRID) {
                    this.createGrid();
                }
            },
            /**
             * Create a floor grid
             */
            createGrid: function () {
                var size = 100, step = 10;
                var geometry = new THREE.Geometry();
                var material = new THREE.LineBasicMaterial({color: 'black'});
                for(var i = -size; i <= size; i += step){
                    geometry.vertices.push(new THREE.Vector3(-size, 0.04, i));
                    geometry.vertices.push(new THREE.Vector3(size, 0.04, i));
                    geometry.vertices.push(new THREE.Vector3(i, 0.04, -size));
                    geometry.vertices.push(new THREE.Vector3(i, 0.04, size));
                }
                var line = new THREE.Line(geometry, material, THREE.LinePieces);
                line.name="grid";
                this.context.scene.add(line);
            },

            createGround: function () {
                var ground;
                var groundMaterial = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    ambient: 0x888888,
                    shading: THREE.SmoothShading
                });

                ground = new THREE.Mesh( new THREE.PlaneGeometry(1024, 1024), groundMaterial);
                ground.rotation.x = -Math.PI / 2;
                ground.name="ground";
                this.context.scene.add(ground);
            }
        };

        /**
         * @namespace  Camera initialization.  Contains setup for both Perspective and Orthographic cameras.
         * @class Creates cameras for the scene.
         */
        Viewer.Scene.Cameras = function (params) {

            this.context = params.context;

            this.liveCam = null;
            this.FOV = ThreejsSet.CAM.FOV || 70;

            this.WIDTH = this.context.container.clientWidth;
            this.HEIGHT = this.context.container.clientHeight;

            // VIEWSIZE is the virtual distance across internally to the orthographic display.
            //   How many "3D world units" across the ration will represent.
            //   Setting this variable ensures you will have a regular distance across even if your windows resizes.
            this.VIEWSIZE = ThreejsSet.CAM.VIEWSIZE || 1000;
            this.ASPECT_RATIO = this.WIDTH / this.HEIGHT;

            this.ORTHO_CAMERA = (ThreejsSet.CAM.ORTHO) ? true : false;

            /** Perspective camera setup **/
            this.perpCam = null;
            this.PERP_NEAR_PLANE = ThreejsSet.CAM.PERP_NEAR_PLANE || 1;
            this.PERP_FAR_PLANE = ThreejsSet.CAM.PERP_FAR_PLANE || 10000;

            this.orthCam = null;
            this.ORTH_NEAR_PLANE = ThreejsSet.CAM.ORTH_NEAR_PLANE || -1000;
            this.ORTH_FAR_PLANE = ThreejsSet.CAM.ORTH_FAR_PLANE || 1000;

            this.controls = null;

            this.init();
        };

        Viewer.Scene.Cameras.prototype = {

            /**
             * Initialize a camera.
             */
            init: function () {
                if(this.ORTHO_CAMERA){
                    this.initOrthographicCamera();
                } else {
                    this.initPerspective();
                }
            },

            /**
             *  Inititalize the orthographic camera.
             */
            initOrthographicCamera: function () {
                this.orthoCam = new THREE.OrthographicCamera
                (
                    -this.ASPECT_RATIO * this.VIEWSIZE/2,
                    this.ASPECT_RATIO * this.VIEWSIZE/2,
                    this.VIEWSIZE / 2,
                    this.VIEWSIZE / -2,
                    this.ORTH_NEAR_PLANE,
                    this.ORTH_FAR_PLANE
                );

                this.orthoCam.name = 'ortho';

                this.liveCam = this.orthoCam;
                // console.log('init orth cam');
            },

            /**
             * Initialize the perspective camera.
             */
            initPerspective: function () {

                this.perpCam = new THREE.PerspectiveCamera
                (
                    this.FOV,
                    this.ASPECT_RATIO,
                    this.PERP_NEAR_PLANE,
                    this.PERP_FAR_PLANE
                );

                this.perpCam.position.y = 0;
                this.perpCam.position.z = 30;
                this.perpCam.lookAt( this.context.scene.position );

                this.perpCam.name = 'perp';

                this.liveCam = this.perpCam;
            }
        };

        Viewer.Util = {

            /**
             *  Create a random color
             */
            randomHex: function () {
                return ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
            },

            /**
             *   Change a group of meshes to random colors.
             *   @param {THREE.Mesh} mesh Cube mesh.
             */
            changeColor: function (mesh) {

                var rand = parseInt('0x' + this.randomHex(), 16);
                mesh.object.material.color.setHex(rand);

            },

            randomColor: function () {
                return parseInt('0x' + this.randomHex(), 16);
            },

            randomInt: function (max, min) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            supportsWebGL: function () {
                try {
                    return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
                } catch( e ) {
                    return false;
                }
            }
        };

        Viewer.Wrangler = Viewer.Wrangler || {};

        /**
         * @class This is a resource manager and loads individual models.
         *
         * @struct
         * @constructor
         */
        Viewer.Wrangler = function (params) {

            this.context = params.context;

            this.currentModel = null;

            this.loadingManager = new THREE.LoadingManager();
            this.objMtlLoader = new THREE.OBJMTLLoader(this.loadingManager);
            this.objLoader = new THREE.OBJLoader(this.loadingManager);
            this.imgLoader = new THREE.ImageLoader(this.loadingManager);
            this.glTFLoader = new THREE.glTFLoader();
            this.jsLoader = new THREE.JSONLoader();
            this.plyLoader = new THREE.PLYLoader();

            this.name = null;

            this.imgFiles = {};
        };

        /**
         *
         */
        Viewer.Wrangler.prototype = {

            init: function () {
                THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
                this.listeners();
                this.loadDefaultFiles();
            },

            listeners: function () {
                this.loadingManager.onProgress = function (item, loaded, total) {
                    console.log(item, loaded, total);
                };
            },

            loadDefaultFiles: function () {

                var tex = ThreejsSet.SAMPLES.GRIDTEXTURE;
                this.loadNormalTexture(tex);
            },
            /**
             * @param {!string} url
             * @param {!string} name
             */
            loadJSON: function (url, name) {
                this.removeFromScene();
                this.name = name;

                this.jsLoader.load(url, function (geometry, materials) {
                    var object = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                    object.rotation.x = -Math.PI / 2;
                    object.position.y += 50;

                    object.name = name;
                    this.currentModel = object;
                    this.context.scene.add(object);
                }.bind(this));
            },

            /**
             * @param {!string} url
             * @param {!string} name
             */
            loadPLY: function (url, name) {
                this.removeFromScene();
                this.name = name;

                this.plyLoader.load(url, function (geometry) {
                    //var material = new THREE.MeshPhongMaterial( { color: 0x0055ff, specular: 0x111111, shininess: 200 } );
                    var object = new THREE.Mesh(geometry);
                    object.rotation.x = -Math.PI / 2;
                    object.position.y += 50;

                    object.name = name;
                    this.currentModel = object;
                    this.context.scene.add(object);
                }.bind(this));
            },

            /**
             * @param {!string} obj
             * @param {!string} name
             */
            loadOBJ: function (obj, name) {
                this.removeFromScene();
                this.name = name;
                // load the OBJapply the UV texture grid
                this.objLoader.load(obj, function (object) {
                    var texture;
                    if (this.imgFiles[name]) {
                        texture = this.imgFiles[name];
                    } else {
                        texture = this.imgFiles['grid'];
                    }

                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material.map = texture;
                        }
                    });
                    object.name = name;
                    this.currentModel = object;
                    this.context.scene.add(object);
                }.bind(this));
            },

            /**
             * @param {!string} obj
             * @param {!string} mtl
             * @param {!string} name
             */
            loadOBJMTL: function (obj, mtl, name, scale, positionX, positionY, positionZ, rotateX, rotateY, rotateZ) {
                this.removeFromScene();
                this.name = name;
                // Load an obj and mtl texture
                this.objMtlLoader.load(obj, mtl, function (object) {

                    object.name = name;
                    this.currentModel = object;
                    if (scale) {
                        object.scale.set(scale, scale, scale);
                    }
                    if (rotateX && rotateY && rotateZ) {
                        object.rotation.set(
                            THREE.Math.degToRad(rotateX),
                            THREE.Math.degToRad(rotateY),
                            THREE.Math.degToRad(rotateZ)
                        );
                    }
                    if(positionX && positionY && positionZ){
                        object.position.set(positionX,positionY,positionZ)
                    }



                    this.context.scene.add(object);
                }.bind(this));
            },

            /**
             * @param {!string} url
             * @param {!string} name
             */
            loadGLTF: function (url, name) {
                this.removeFromScene();
                this.name = name;
                this.glTFLoader.load(url, function (object) {

                    object.scene.name = name;
                    this.currentModel = object.scene;
                    //TODO:  add animation
                    this.context.scene.add(object.scene);
                }.bind(this));
            },

            /**
             * Loading a normal texture
             * @param {!string} tex
             */
            loadNormalTexture: function (tex) {
                // Load an image texture to use on an OBJ
                var texture = new THREE.Texture();
                this.imgLoader.load(tex, function (image) {
                    texture.image = image;
                    texture.needsUpdate = true;
                    this.imgFiles['grid'] = texture;
                }.bind(this));
            },

            /**
             * Removes the old object from the scene
             */
            removeFromScene: function () {
                var obj = this.context.scene.getObjectByName(this.name, true);
                this.context.scene.remove(obj);
            }
        };

        return Viewer;

    }

})(angular.module(APP_NAME));