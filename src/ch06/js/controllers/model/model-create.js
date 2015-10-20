/**
 * Created by liekkas on 15/10/19.
 */
(function (app) {
    'use strict';

    /* @ngInject */
    function ModelCreateCtrl($cordovaCamera,$cordovaCapture,API,CameraOper,$window) {
        //视图模型ViewModel
        var vm = this;

        document.addEventListener("deviceready", function () {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // error
            });

        }, false);


        vm.takePhoto=function(){
            window.plugins.autotakecamera.autoTakePictures(function(results){
                    var ft = new FileTransfer();
                    var errStr="";
                    for(var i=0;i<results.length;i++ ){
                        var info = results[i];
                        var fullPath = info.path;
                        var name = (i<10?"0"+i+".jpg":i+".jpg");
                        ft.upload(fullPath,
                            API.UPLOAD_URL+'/api/containers/container1/upload',
                            function(result) {
                                //alert('Upload success: ' + result.responseCode);
                                //alert(result.bytesSent + ' bytes sent');
                            },
                            function(error) {
                                errStr+='Error uploading file ' + fullPath + ': ' + error.code;
                            },
                            { fileName: name });
                    }
                    if(errStr!=""){
                        alert(errStr);
                    }

                },
                function(err){
                    alert('Returncode: ' + JSON.stringify(error.code));
                },{"timeInterval":0.3,"maxCount":20,"imgCompress":1.0,"resolutionType":"AVCaptureSessionPreset640x480"})
        };
        vm.takeVideo=function() {
            var opt = {
                limit: 1,
                duration: 10
            };

            $cordovaCapture.captureVideo(opt).then(
                function (mediaFiles) {
                    var i, path, len;
                    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                        path = mediaFiles[i].fullPath;
                        $window.alert(path);
                        // do something interesting with the file
                    }
                },
                function (error) {
                    $window.alert('take video error ' + error);
                }
            );
        }
        
    }

    app.controller('ModelCreateCtrl', ModelCreateCtrl);

})(angular.module(APP_NAME));