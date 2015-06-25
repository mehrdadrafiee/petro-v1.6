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

    $scope.lines = {
      labels: [],
      data: [],
      series: ['Original Gas Rate (MCFD)', 'Gas Cum', 'Forecast Rate (MCFD)'],
      colours: ['#0067C7', '#D1068A', '#7404BA']
    };

    $scope.uploadFile = function() {
      console.log($scope.wellFile);

      if ($scope.wellFile[0]) {
        extractData($scope.wellFile[0])
          .then(function (parsedData) {
            var lines = {};
            _.each(parsedData.Data, function(row) {
              if (row['Original Date']) {
                var origDate = moment(row['Original Date'], 'MMM-YY').format('YYYY-MM-DD');
                if (!lines[origDate]) { lines[origDate] = {}; }
                lines[origDate].origRate = +row['Original Gas Rate (MCFD)'];
                lines[origDate].origCum = +row['Gas Cum'];
              }
              if (row['Forecast Date']) {
                var foreDate = moment(row['Forecast Date'], 'MM/DD/YYYY').format('YYYY-MM-DD');
                if (!lines[foreDate]) { lines[foreDate] = {}; }
                lines[foreDate].foreRate = +row['Forecast Rate (MCFD)'];
              }
            });
            console.log(lines);
            var labels = $scope.lines.labels = _.keys(lines).sort();
            labels.splice(10);
            var data = $scope.lines.data = [[], [], []];
            _.each(labels, function(date) {
              data[0].push(lines[date].origRate);
              //data[1].push(lines[date].origCum);
              //data[2].push(lines[date].foreRate);
            });

            console.log($scope.lines);
          });
      }
    };

    function extractData(file) {
      var defer = $q.defer();
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        var parsedData = toJson(workbook);
        defer.resolve(parsedData);
      };
      reader.readAsBinaryString(file);

      return defer.promise;
    }

    function toJson(workbook) {
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
