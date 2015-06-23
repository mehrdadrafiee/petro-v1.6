'use strict';

//DATA
var data = [
  {
    "WELL": 1,
    "Latitude": 40.2608419,
    "Longitude": -80.58238126,
    "API_NUMBER": 4700900110,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 5327,
    "STAGES": 8,
    "FPD": "1/2/2014 0:00:00",
    "Total_Oil": 37830.11,
    "Total_Gas": 428894.69,
    "Total_Water": 8743.2
  },
  {
    "WELL": 2,
    "Latitude": 40.22935557,
    "Longitude": -80.56324169,
    "API_NUMBER": 4700900111,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 6034,
    "STAGES": 9,
    "FPD": "1/2/2014 0:00:00",
    "Total_Oil": 35312,
    "Total_Gas": 391712.93,
    "Total_Water": 11126.75
  },
  {
    "WELL": 3,
    "Latitude": 40.10943985,
    "Longitude": -80.56824511,
    "API_NUMBER": 4700900112,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 4387,
    "STAGES": 7,
    "FPD": "11/9/2012 0:00:00",
    "Total_Oil": 29361.7,
    "Total_Gas": 397742.68,
    "Total_Water": 6553.7
  },
  {
    "WELL": 4,
    "Latitude": 40.08674287,
    "Longitude": -80.55372286,
    "API_NUMBER": 4700900113,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 4366,
    "STAGES": 9,
    "FPD": "11/9/2012 0:00:00",
    "Total_Oil": 36441.55,
    "Total_Gas": 618803.42,
    "Total_Water": 7641.48
  },
  {
    "WELL": 5,
    "Latitude": 40.1779356,
    "Longitude": -80.62499196,
    "API_NUMBER": 4700900114,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 5130,
    "STAGES": 11,
    "FPD": "3/2/2013 0:00:00",
    "Total_Oil": 59691.91,
    "Total_Gas": 443816.23,
    "Total_Water": 14220
  },
  {
    "WELL": 6,
    "Latitude": 40.18891622,
    "Longitude": -80.63263827,
    "API_NUMBER": 4700900115,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 5607,
    "STAGES": 13,
    "FPD": "3/2/2013 0:00:00",
    "Total_Oil": 57902.28,
    "Total_Gas": 420095.89,
    "Total_Water": 16379.44
  },
  {
    "WELL": 7,
    "Latitude": 40.18774708,
    "Longitude": -80.64146598,
    "API_NUMBER": 4700900116,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 4905,
    "STAGES": 10,
    "FPD": "3/2/2013 0:00:00",
    "Total_Oil": 54123.2,
    "Total_Gas": 377995.46,
    "Total_Water": 10563.32
  },
  {
    "WELL": 8,
    "Latitude": 40.17161429,
    "Longitude": -80.61764754,
    "API_NUMBER": 4700900117,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 6173,
    "STAGES": 10,
    "FPD": "6/2/2013 0:00:00",
    "Total_Oil": 62964.94,
    "Total_Gas": 557332.63,
    "Total_Water": 16235.02
  },
  {
    "WELL": 9,
    "Latitude": 40.1547497,
    "Longitude": -80.6113081,
    "API_NUMBER": 4700900118,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 7701,
    "STAGES": 12,
    "FPD": "6/2/2013 0:00:00",
    "Total_Oil": 68131.25,
    "Total_Gas": 858478.68,
    "Total_Water": 16283.17
  },
  {
    "WELL": 10,
    "Latitude": 40.1547497,
    "Longitude": -80.6113081,
    "API_NUMBER": 4700900119,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 7461,
    "STAGES": 30,
    "FPD": "2/2/2014 0:00:00",
    "Total_Oil": 11526.16,
    "Total_Gas": 940860.55,
    "Total_Water": 16098.41
  },
  {
    "WELL": 11,
    "Latitude": 40.1547497,
    "Longitude": -80.6113081,
    "API_NUMBER": 4700900120,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 5771,
    "STAGES": 23,
    "FPD": "2/2/2014 0:00:00",
    "Total_Oil": 5028.53,
    "Total_Gas": 824050.37,
    "Total_Water": 13379.14
  },
  {
    "WELL": 12,
    "Latitude": 40.01104058,
    "Longitude": -80.59417098,
    "API_NUMBER": 4700900121,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 7032,
    "STAGES": 15,
    "FPD": "1/2/2013 0:00:00",
    "Total_Oil": 32112.52,
    "Total_Gas": 740814.97,
    "Total_Water": 26426.31
  },
  {
    "WELL": 13,
    "Latitude": 40.012159,
    "Longitude": -80.590669,
    "API_NUMBER": 4700900122,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 7672,
    "STAGES": 15,
    "FPD": "4/2/2013 0:00:00",
    "Total_Oil": 31270.68,
    "Total_Gas": 655310.17,
    "Total_Water": 27046.84
  },
  {
    "WELL": 14,
    "Latitude": 40.04094843,
    "Longitude": -80.62467154,
    "API_NUMBER": 4700900123,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 7672,
    "STAGES": 15,
    "FPD": "1/2/2013 0:00:00",
    "Total_Oil": 39088.55,
    "Total_Gas": 892869.16,
    "Total_Water": 12127.78
  },
  {
    "WELL": 15,
    "Latitude": 40.007608,
    "Longitude": -80.597501,
    "API_NUMBER": 4700900124,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 7929,
    "STAGES": 15,
    "FPD": "4/2/2013 0:00:00",
    "Total_Oil": 57126.55,
    "Total_Gas": 1126968.81,
    "Total_Water": 24459.29
  },
  {
    "WELL": 16,
    "Latitude": 40.26049733,
    "Longitude": -80.54848833,
    "API_NUMBER": 4700900125,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 4423,
    "STAGES": 7,
    "FPD": "5/2/2013 0:00:00",
    "Total_Oil": 39493.23,
    "Total_Gas": 423734,
    "Total_Water": 8922.27
  },
  {
    "WELL": 17,
    "Latitude": 40.26997803,
    "Longitude": -80.55231515,
    "API_NUMBER": 4700900126,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 480,
    "STAGES": 5,
    "FPD": "5/2/2013 0:00:00",
    "Total_Oil": 27435.05,
    "Total_Gas": 264358.17,
    "Total_Water": 8128.53
  },
  {
    "WELL": 18,
    "Latitude": 40.26997803,
    "Longitude": -80.55231515,
    "API_NUMBER": 4700900127,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 8225,
    "STAGES": 35,
    "FPD": "9/22/2014 0:00:00",
    "Total_Oil": 20527.1,
    "Total_Gas": 218675.81,
    "Total_Water": 5702.11
  },
  {
    "WELL": 19,
    "Latitude": 40.26997803,
    "Longitude": -80.55231515,
    "API_NUMBER": 4700900128,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 5577,
    "STAGES": 27,
    "FPD": "12/11/2013 0:00:00",
    "Total_Oil": 19714.87,
    "Total_Gas": 720767.81,
    "Total_Water": 13431.89
  },
  {
    "WELL": 20,
    "Latitude": 40.26997803,
    "Longitude": -80.55231515,
    "API_NUMBER": 4700900129,
    "OPERATOR": "ABC",
    "STATUS": "PRODUCING",
    "RSV_CAT": "PDP",
    "LAT_LENGTH": 8232,
    "STAGES": 32,
    "FPD": "12/11/2013 0:00:00",
    "Total_Oil": 27449.7,
    "Total_Gas": 1010203.45,
    "Total_Water": 14812.91
  }
];

var app = angular.module('petroApp')
  .controller('DashboardCtrl', ['$scope', '$http', '$q', '$timeout', function ($scope, $http, $q, $timeout) {

    var wellnames = [];
    var latitudes = [];
    var longitudes = [];
    var apiNumbers = [];
    var operators = [];
    var statuses = [];
    var rsvCats = [];
    var latLengths = [];
    var stages = [];
    var fpds = [];
    var oils = [];
    var gases = [];
    var waters = [];
    var id;
    console.log("the le of data is " + data.length);


    for (var i = 0, len = data.length; i < len; i++) {
      wellnames.push(data[i].WELL);
      latitudes.push(data[i].Latitude);
      longitudes.push(data[i].Longitude);
      apiNumbers.push(data[i].API_NUMBER);
      operators.push(data[i].OPERATOR);
      statuses.push(data[i].STATUS);
      rsvCats.push(data[i].RSV_CAT);
      latLengths.push(data[i].LAT_LENGTH);
      stages.push(data[i].STAGES);
      fpds.push(data[i].FPD);
      stages.push(data[i].Longitude);
      stages.push(data[i].Longitude);
    }

    function generateRandomItem(id) {

      // data.forEach(function (elements) {

      //   wellnames.push(elements.WELL);
      //   latitudes.push(elements.Latitude);
      //   longitudes.push(elements.Longitude);
      //   apiNumbers.push(elements.API_NUMBER);
      //   operators.push(elements.OPERATOR);
      //   statuses.push(elements.STATUS);
      //   rsvCats.push(elements.RSV_CAT);
      //   latLengths.push(elements.LAT_LENGTH);
      //   stages.push(elements.STAGES);
      //   fpds.push(elements.FPD);
      //   oils.push(elements.Total_Oil);
      //   gases.push(elements.Total_Gas);
      //   waters.push(elements.Total_Water);
      //         });
      console.log("Well " + wellnames + " has latitude of "
      + latitudes + ", longitude of " + longitudes + ", API Number " +
      apiNumbers + ", operator is " + operators + ", status is " + statuses
      + ", RSV CAT is " + rsvCats + ", LAT LENGTH is " + latLengths +
      ", stage is " + stages + ", FPD is " + fpds + ", Total oil is " +
      oils + ", total gas is " + gases + ", total water is " + waters);
      return {
        id: id,
        wellName: wellnames,
        latitude: latitudes,
        longitude: longitudes,
        apiNumber: apiNumbers,
        operator: operators,
        status: statuses,
        rsvCat: rsvCats,
        latLength: latLengths,
        stage: stages,
        fpd: fpds,
        oil: oils,
        gas: gases,
        water: waters
      }
    }

    $scope.rowCollection = [];

    for (id; id < 5; id++) {
      $scope.rowCollection.push(generateRandomItem(id));
    }

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    //$scope.displayedCollection = [].concat($scope.rowCollection);

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
      $scope.rowCollection.push(generateRandomItem(id));
      id++;
    };

    initData();
    //Map related work

    $scope.$on('mapInitialized', function(event, map) {
      $scope.map = map;
    });

    function makeWellMarkers (wellData){
      var markers = [];

      wellData && wellData.forEach(function(well, i){
        markers[i] = new google.maps.Marker({
          title: "Hi marker " + i
        })
      })

      wellData && wellData.forEach(function(well, i){
        markers[i] = new google.maps.Marker({});
        var latlng = new google.maps.LatLng(well.latitude, well.longitude);
        markers[i].setPosition(latlng);
        markers[i].setMap($scope.map);
      })

      var new_boundary = new google.maps.LatLngBounds();

      for(var index in markers){
        var  position = markers[index].position;
        new_boundary.extend(position);
      }

      $scope.map.fitBounds(new_boundary);
    }


    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
        $scope.rowCollection.splice(index, 1);
      }
    };

    $scope.uploadFile = function () {
      if (!$scope.wellFile) return alert('Please select a file');

      extractData($scope.wellFile)
        .then(function (parsedData) {
          console.log(parsedData);
          var a = parseData(parsedData.Sheet1);

          $http.post('/api/dashboards/', {chartsData: a})
            .then(function (resp) {
              console.log(resp);
              initData();
            },
            function (err) {
              alert('Error in importing Data File');
            }
          )
        });
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

    function parseData(rawData) {
      var data = [];
      var dataMapper = {
        WELL_NAME: 'name',
        Wellhead_Latitude: 'latitude',
        Wellhead_Longitude: 'longitude',
        API_NUMBER: 'apiNumber',
        OPERATOR: 'operator',
        STATUS: 'status',
        'RSV_CAT': 'rsvCat',
        LAT_LENGTH: 'latLength',
        STAGES: 'stages',
        FPD: 'fpd',
        Total_Oil: 'oil',
        Total_Gas: 'gas',
        Total_Water: 'water'
      };

      rawData && rawData.forEach(function (single) {
        var temp = {};
        for (var prop in single) {

          temp[dataMapper[prop]] = single[prop] || null;
        }
        data.push(temp);
      });

      return data;
    }

    function initData (){
      $http.get('/api/dashboards/')
        .then(function (resp) {

          var well = $scope.displayedCollection = resp.data;
          console.log(well);
          if (!well.length) {
            return;
          }

          makeWellMarkers(well);

        },
        function (err) {
          alert('Error in getting wells');
        });
    }

  }]);



