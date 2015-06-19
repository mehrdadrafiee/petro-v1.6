'use strict';

angular.module('petroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('table', {
        url: '/table',
        templateUrl: 'app/table/table.html',
        controller: 'TableCtrl'
      });
  });