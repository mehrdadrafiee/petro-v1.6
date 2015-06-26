'use strict';

angular.module('petroApp')
  .controller('TableCtrl', function ($scope, $location, $http, Auth, XLS) {
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

    $scope.dashboard = null;

    $scope.statistics = null;

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
      if (files && files.length) {
        XLS.extractData(files[0])
          .then(function (parsedData) {
            $scope.lineChartState.update(parsedData);
            $scope.barChartState.update(parsedData);
            $scope.statistics = parsedData.Data;
          });
      }
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.$on('mapInitialized', function(event, map) {
      $scope.map = map;
    });

    $http.get('/api/dashboards')
      .success(function(dashboards) {
        if (dashboards && dashboards.length) {
          var dashboard = $scope.dashboard = dashboards[0];

          if ($scope.map) {
            var marker = new google.maps.Marker({});
            marker.setPosition(new google.maps.LatLng(dashboard.latitude, dashboard.longitude));
            marker.setMap($scope.map);

            var boundary = new google.maps.LatLngBounds();
            boundary.extend(marker.position);
            $scope.map.fitBounds(boundary);
          }
        }
      });
  });
