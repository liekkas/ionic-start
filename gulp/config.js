'use strict';

var nodeModulesPath = '/Users/liekkas/node_modules'; //node_modules存放路径
var bowerComponentsPath = '/Users/liekkas/bower_components'; //bower包路径
var jsComponentsPath = '/Users/liekkas/js-components'; //自己维护的包路径
var srcPath = 'src/ch05'; //源码路径
var publicPath = 'www'; //发布输出路径

module.exports = {

  'publicPath' : publicPath,

  //-----------开发服务器设置-----------
  'browserPort'  : 3000,
  'UIPort'       : 3001,
  'serverPort'   : 3002,

  //-----------第三方框架引用----------
  'vendors': {
    'src': [
      {
        name: 'ionic',
        path: bowerComponentsPath+'/ionic/release/**/*.*'
      },{
        name: 'ionic/scss',
        path: bowerComponentsPath+'/ionic/scss/**/*.*'
      }
      //,{
      //  name: 'ionic-material',
      //  path: bowerComponentsPath+'/ionic-material/dist/*.*'
      //},{
      //  name: 'robotodraft',
      //  path: bowerComponentsPath+'/robotodraft/**/*.*'
      //}
      ],
    'devDest': srcPath + '/assets/vendors',  //复制到开发包下
    'pubDest': publicPath + '/assets/vendors'
  },

  //--------------sass样式编译--------------
  'styles': {
    'src' : srcPath + '/assets/scss/**/*.scss',
    'dest': publicPath+'/assets/css',
    'devDest' : srcPath+'/assets/css',   //编译时也同时输入到app下，便于开发使用快捷提示
    'prodSourcemap': false,
    'sassIncludePaths': []
  },

  'scripts': {
    'src' : [srcPath+'/js/main.js',srcPath+'/js/**/*.js','!'+srcPath+'/js/app.js'],
    'devDest': srcPath+'/js',
    'pubDest': publicPath+'/js'
  },

  'images': {
    'src' : srcPath+'/assets/images/**/*',
    'dest': publicPath+'/assets/images'
  },

  //--------------视图--------------
  'views': {
    'index': srcPath+'/index.html',
    'watch': [
      srcPath+'/index.html',
      srcPath+'/views/**/*.html'
    ],
    'src': srcPath+'/views/**/*.html',
    'dest': srcPath+'/js'
  },

  'gzip': {
    'src': publicPath+'/**/*.{html,xml,json,css,js,js.map,css.map}',
    'dest': publicPath+'/',
    'options': {}
  }

};
