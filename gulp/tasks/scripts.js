//'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var annotate     = require('gulp-ng-annotate');
var browserSync  = require('browser-sync');

gulp.task('scripts', function() {
    return gulp.src(config.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(annotate())
        .pipe(sourcemaps.write())
        .pipe(gulpif(global.isProd,uglify()))
        .pipe(gulp.dest(config.scripts.devDest))
        .pipe(gulp.dest(config.scripts.pubDest))
        .pipe(browserSync.stream({ once: true }));
});
