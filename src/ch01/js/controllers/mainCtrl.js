/**
 * Created by liekkas on 15/10/12.
 */
(function (app) {
  'use strict';

  app.controller('DashCtrl', DashCtrl);
  app.controller('ChatsCtrl', ChatsCtrl);
  app.controller('ChatDetailCtrl', ChatDetailCtrl);
  app.controller('AccountCtrl', AccountCtrl);

  /* @ngInject */
  function DashCtrl() {
    //视图模型ViewModel
    var vm = this;
  }
  /* @ngInject */
  function ChatsCtrl($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }

  /* @ngInject */
  function ChatDetailCtrl($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  }

  /* @ngInject */
  function AccountCtrl($scope) {
    $scope.settings = {
      enableFriends: true
    };
  }


})(angular.module(APP_NAME));
