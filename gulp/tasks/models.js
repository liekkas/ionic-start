'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');

gulp.task('models', function() {

  return gulp.src(config.models.src)
    .pipe(changed(config.models.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.models.dest))
    .pipe(browserSync.stream({ once: true }));

});