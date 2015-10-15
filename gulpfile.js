'use strict';

/*
 * 第一次运行：gulp init 来把项目需要的外部库引入进来
 * 开发：gulp dev
 * 发布：gulp public
 */

/**
 * 是否是生产环境
 * @type {boolean}
 */
global.isProd = true;

require('./gulp');
