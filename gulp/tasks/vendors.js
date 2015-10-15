'use strict';

var config       = require('../config');
var gulp         = require('gulp');

/**
 * 把第三方包引进项目
 *  - 拷贝一份到开发包
 *  - 拷贝一份到发布包
 */

var initVendors = function () {
    var n = config.vendors.src.length;
    for(var i=0;i<n;i++){
        gulp.src(config.vendors.src[i].path)
            .pipe(gulp.dest(config.vendors.devDest+'/'+config.vendors.src[i].name));
    }
};

var copyVendors = function () {
    gulp.src(config.vendors.devDest+'/**/*.*')
      .pipe(gulp.dest(config.vendors.pubDest));
};

//初始化把相关的外部包引入进来
gulp.task('init',['clean-vendors'], initVendors);

//拷贝到发布目录
gulp.task('vendors', copyVendors);

