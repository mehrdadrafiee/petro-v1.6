'use strict';

angular.module('petroApp')
  .controller('TableCtrl', function ($scope, $location, Auth, $q) {
    $scope.menu = [{
      'title': 'Table',
      'link': '/table'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.lineChartState = {
      settings: {
        x: { column: 'Date', format: 'MMM-YY' },
        y: [
          {
            type: 'lineChart',
            column: 'Original Gas Rate (MCFD)',
            color: 'blue'
          },
          {
            type: 'lineChart',
            column: 'Gas Cum forecast',
            color: 'purple',
            rightY: true
          },
          {
            type: 'lineChart',
            column: 'Forecast Rate (MCFD)',
            color: 'red'
          }
        ],
        yAxis: 'Gas Production Rate (MCFD)',
        rightYAxis: 'Cumulative Gas Production (BCF)'
      }
    };

    $scope.barChartState = {
      settings: {
        x: { column: 'Year', format: 'YYYY' },
        y: [
          {
            type: 'barChart',
            column: 'Cum. Cash 8%',
            color: 'blue'
          }
        ]
      }
    };

    /*$scope.lines = {
      labels: [],
      data: [],
      series: ['Original Gas Rate (MCFD)', 'Gas Cum', 'Forecast Rate (MCFD)'],
      colours: ['#0067C7', '#D1068A', '#7404BA'],
      options: {
        showTooltips: false
      }
    };*/

    $scope.lines = null;

    $scope.uploadFile = function(files) {
      $scope.lineChartState.notifyUpload(files);
      $scope.barChartState.notifyUpload(files);
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
