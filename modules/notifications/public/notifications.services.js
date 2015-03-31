'use strict';

angular.module('atwork.notifications')
  .factory('appNotification', [
    '$resource',
    '$mdToast',
    function($resource, $mdToast) {
      return {
        show: function(data) {

          var toast = $mdToast.simple()
            .content(data.message)
            .action('VIEW')
            .highlightAction(false)
            .position('bottom right');

          $mdToast.show(toast).then(function() {
            if (data.then) {
              data.then();
            }
          });
        }
      }
    }
  ])
  .factory('appNotificationText', [
    function() {
      return function(obj) {
        if (!obj) return {text: ''};
        var msg = '';
        var actor = obj.actor;

        switch (obj.notificationType) {
          case 'like':
          msg = actor.name + ' has liked a post';
          break;
          
          case 'comment':
          msg = actor.name + ' has commented on a post';
          break;
          
          case 'follow':
          msg = actor.name + ' is now following you';
          break;

          case 'mention':
          msg = actor.name + ' mentioned you in a post';
          break;
        }
        return {text: msg};
      }
    }
  ])
  ;
  