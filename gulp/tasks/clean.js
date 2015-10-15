'use strict';

var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

gulp.task('clean', function(cb) {
  return del([config.publicPath,'!'+config.publicPath+'/assets/vendors/**/*'], cb);
});

//删除build目录
gulp.task('clean-build', function () {
  return del([config.publicPath],cb);
});

//删除vendors目录
gulp.task('clean-vendors', function(cb) {
  return del([config.vendors.devDest,config.vendors.pubDest], cb);
});
