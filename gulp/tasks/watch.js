'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('watch', ['browserSync', 'server'], function() {

  gulp.watch(config.styles.src,  ['styles']);
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.views.watch, ['views']);
  gulp.watch(config.scripts.src, ['scripts']);

});
