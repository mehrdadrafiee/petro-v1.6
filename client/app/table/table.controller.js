'use strict';

angular.module('petroApp')
  .controller('TableCtrl', function ($scope, $location, Auth,Upload) {
    $scope.menu = [{
      'title': 'Table',
      'link': '/table'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.uploadFile = function(files){
       var file = files[0];
       if(file !== undefined){
         Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            fields: {},
            file: file
         }).success(function (data, status, headers, config) {
            alert('file uploaded successfully');
            console.log(config);
        });
      }
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });