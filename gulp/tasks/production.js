'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('public', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  runSequence(['vendors','styles', 'images', 'views', 'scripts'], 'gzip', cb);

});
