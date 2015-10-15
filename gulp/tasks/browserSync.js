'use strict';

var config      = require('../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');

/**
 * 浏览器自动同步
 */
gulp.task('browserSync', function() {

  browserSync({
  	port: config.browserPort,
  	ui: {
    	port: config.UIPort
    },
    proxy: 'localhost:' + config.serverPort
  });

});
