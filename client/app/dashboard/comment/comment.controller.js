'use strict';

angular.module('petroApp')
  .controller('CommentCtrl', function ($scope, $http, socket) {
    $scope.newComment = '';

    // Grab the initial set of available comments
    $http.get('/api/comments').success(function(comments) {
      $scope.comments = comments;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('comment', $scope.comments, function(event, comment, comments) {
        // This callback is fired after the comments array is updated by the socket listeners
 
        // sort the array every time its modified
        comments.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });
 
    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('comment');
    });
 
    // Use our rest api to post a new comment
    $scope.addComment = function() {
      $http.post('/api/comments', { content: $scope.newComment });
      $scope.newComment = '';
    };
  });
