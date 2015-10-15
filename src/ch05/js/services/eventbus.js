/**
 * Created by liekkas on 14/12/12.
 */
/**
 * 事件中心，尽量避免使用broadcast以提供性能
 * 可参考 http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs/19498009#19498009
 */
(function (app) {
  'use strict';

  /* @ngInject */
  function EventBus($rootScope) {

    function emitMsg(msg, data) {
      data = data || {};
      $rootScope.$emit(msg, data);
    }

    function onMsg(msg, func, scope) {
      var unbind = $rootScope.$on(msg, func);
      if (scope) {
        scope.$on('$destroy', unbind);
      }
      return unbind;
    }

    return {
      emitMsg: emitMsg,
      onMsg: onMsg
    };
  }

  app.factory('EventBus', EventBus);

})(angular.module(APP_NAME));

