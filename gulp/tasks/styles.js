'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

/**
 * 编译sass，拷贝css
 */

gulp.task('styles', function () {

  var createSourcemap = !global.isProd || config.styles.prodSourcemap;

  return gulp.src(config.styles.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(sass({
      sourceComments: !global.isProd,
      outputStyle: global.isProd ? 'compressed' : 'nested',
      includePaths: config.styles.sassIncludePaths
    }))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .on('error', handleErrors)
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null ))
    )
    .pipe(gulp.dest(config.styles.dest))
      .pipe(gulp.dest(config.styles.devDest))
      .pipe(browserSync.stream({ once: true }));

});
