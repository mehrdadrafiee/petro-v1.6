'use strict';

angular.module('petroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('comment', {
        url: '/dashboard/comment',
        templateUrl: 'app/dashboard/comment/comment.html',
        controller: 'CommentCtrl'
      });
  });