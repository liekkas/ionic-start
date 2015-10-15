'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var templateCache  = require('gulp-angular-templatecache');

/**
 * 使用templatecache把所有视图启动时就缓存到js文件中，优化使用体验
 * ionic默认是缓存第一次访问的视图，这样每次访问新的视图都会有点延迟。
 */
gulp.task('views', function() {

  gulp.src(config.views.index)
    .pipe(gulp.dest(config.publicPath));

  return gulp.src(config.views.src)
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream({ once: true }));

});
