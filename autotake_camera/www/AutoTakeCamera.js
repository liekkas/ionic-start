function AutoTakeCamera() {
}

AutoTakeCamera.prototype.autoTakePictures = function (successCallback, errorCallback, options) {
  var win = function(message) {
    successCallback(message);
  };
  cordova.exec(win, errorCallback, "AutoTakeCamera", "autoTakePictures", [options]);
};



AutoTakeCamera.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.autotakecamera = new AutoTakeCamera();
  return window.plugins.autotakecamera;
};

cordova.addConstructor(AutoTakeCamera.install);