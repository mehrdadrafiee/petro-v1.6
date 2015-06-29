'use strict';

angular.module('petroApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'smart-table',
  'chart.js',
  'ngMap',
  'ngFileUpload'
])
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .factory('authInterceptor', ["$rootScope", "$q", "$cookieStore", "$location", function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])

  .run(["$rootScope", "$location", "Auth", function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }]);

'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }]);
'use strict';

angular.module('petroApp')
  .controller('LoginCtrl', ["$scope", "Auth", "$location", "$window", function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);

'use strict';

angular.module('petroApp')
  .controller('SettingsCtrl', ["$scope", "User", "Auth", function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  }]);

'use strict';

angular.module('petroApp')
  .controller('SignupCtrl', ["$scope", "Auth", "$location", "$window", function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);

'use strict';

angular.module('petroApp')
  .controller('AdminCtrl', ["$scope", "$http", "Auth", "User", function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  }]);

'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }]);
'use strict';

angular.module('petroApp')
  .controller('ChartCtrl', ['$scope', '$timeout', '$parse', '$http',  function ($scope, $timeout, $parse, $http) {    //used $parse for binding excel sheet
    $scope.line = {
      labels: [1, 2, 3, 4, 5, 6, 7],
      series: ['Series A', 'Series B'],
      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      onClick: function (points, evt) {
        console.log(points, evt);
      }
    };

    $scope.columns = ['A', 'B', 'C', 'D'];

    $scope.rows = [1, 2, 3, 4];

    $scope.cells = {};

    $scope.bar = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    series: ['Series A', 'Series B'],

    data: [
       [65, 59, 80, 81, 56, 55, 40],
       [28, 48, 40, 19, 86, 27, 90]
    ]
      
    };

    $scope.donut = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data: [300, 500, 100]
    };

    $scope.radar = {
      labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

      data:[
          [65, 59, 90, 81, 56, 55, 40],
          [28, 48, 40, 19, 96, 27, 100]
      ]
    };

    $scope.pie = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data : [300, 500, 100]
    };

    $scope.polar = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data : [300, 500, 100, 40, 120]
    };

    $scope.dynamic = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data : [300, 500, 100, 40, 120],
      type : 'PolarArea',

      toggle : function () 
      {
        this.type = this.type === 'PolarArea' ?
          'Pie' : 'PolarArea';
    }
    };

    $scope.compute = function (cell) {
      return $parse($scope.cells[cell])($scope);
    };

    //Old Data ---------------------------

    $scope.progress = 0;
    $scope.isLoading = true;
    $scope.totalWater = null;
    $scope.totalOil = null;
    $scope.totalGas = null;
    $scope.highestOilData = {
      water: null,
      gas: null,
      oil: null
    };


    $scope.sumission = {
      labels: ["Total Water", "Total Oil", "Total Gas"],
      data: [
        {
          value: $scope.totalWater,
          color: "rgba(0, 116, 217, 0.7)",
          highlight: "rgba(0, 116, 217, 1)"
        },
        {
          value: $scope.totalGas,
          color: "rgba(255, 65, 54, 0.7)",
          highlight: "rgba(255, 65, 54, 1)"
         },
         {
          value: $scope.totalOil,
          color: "rgba(46, 204, 64, 0.7)",
          highlight: "rgba(46, 204, 64, 1)"
        }
      ]
    };

    $scope.highestOil = {
      labels: ["Water", "Oil", "Gas"],
      data: [$scope.highestOilData.oil, $scope.highestOilData.gas, $scope.highestOilData.water]
    };

    $scope.barChartData = {
        labels: [],
        series: [ 'Stage'],
        data: [[]]
      };

    $scope.lineChartData = {
      labels: [],
      series: ['Oil', 'Water', 'Gas'],
      data: [[], []]
    };


    $scope.generateCharts = function (){
      var interval = setInterval(function (){
        if($scope.progress < 100){
          $scope.progress += (Math.floor((Math.random() * 10) + 1));
          $scope.$digest();
          console.log('asds')
        }
        else if($scope.progress >= 100){
          clearInterval(interval);
          $scope.isLoading = false;
          initWellDataProcessing($scope.wellData);
          $scope.$digest();
        }
      }, 200);

    };


    initData();

    //Getting data from server
    function initData(){
      $http.get('/api/dashboards/')
        .then(function (resp) {

          var wells = $scope.wellData = resp.data;
          console.log(wells);
          if(!wells.length){
            return;
          }
          /*var highest = 0,
            highestValueIndex = -1;
          wells.some(function (e, i){
            //For getting only 12 wells data
            if(i == 15) return true;
            //Calculating total oil, gas, water
            $scope.totalOil += e.oil;
            $scope.totalGas += e.gas;
            $scope.totalWater += e.water;

            //Calculating highest oil, gas, water well
            if(e.oil > highest){
              highest = e.oil;
              highestValueIndex = i;
            }

            //Parsing data for bar chart
            $scope.barChartData.labels.push(e.name);
            $scope.barChartData.data[0].push(e.stages);

            //Parsing data for line chart
            $scope.lineChartData.labels.push(e.name);
            $scope.lineChartData.data[0].push(e.oil);
            $scope.lineChartData.data[1].push(e.water);
            $scope.lineChartData.data[1].push(e.gas);

          });


          //Get the highest one oil well
          var highestWell = wells[highestValueIndex];
          $scope.highestOil.data[0] = highestWell.water;
          $scope.highestOil.data[1] = highestWell.oil;
          $scope.highestOil.data[2] = highestWell.gas;

          //After getting data from server, update the charts
          $scope.sumission.data[0] = $scope.totalWater;
          $scope.sumission.data[1] = $scope.totalGas;
          $scope.sumission.data[2] = $scope.totalOil;*/

          //initWellDataProcessing(wells);

        },
        function (err) {
          alert('Error in Getting Data, Check the console for error');
          console.log(err)
        }
      )
    }

    function initWellDataProcessing(wells){
      var highest = 0,
        highestValueIndex = -1;
      wells.some(function (e, i){
        //For getting only 12 wells data
        if(i == 15) return true;
        //Calculating total oil, gas, water
        $scope.totalOil += e.oil;
        $scope.totalGas += e.gas;
        $scope.totalWater += e.water;

        //Calculating highest oil, gas, water well
        if(e.oil > highest){
          highest = e.oil;
          highestValueIndex = i;
        }

        //Parsing data for bar chart
        $scope.barChartData.labels.push(e.name);
        $scope.barChartData.data[0].push(e.stages);

        //Parsing data for line chart
        $scope.lineChartData.labels.push(e.name);
        $scope.lineChartData.data[0].push(e.oil);
        $scope.lineChartData.data[1].push(e.water);
        $scope.lineChartData.data[1].push(e.gas);

      });


      //Get the highest one oil well
      var highestWell = wells[highestValueIndex];
      $scope.highestOil.data[0] = highestWell.water;
      $scope.highestOil.data[1] = highestWell.oil;
      $scope.highestOil.data[2] = highestWell.gas;

      //After getting data from server, update the charts
      $scope.sumission.data[0] = $scope.totalWater;
      $scope.sumission.data[1] = $scope.totalGas;
      $scope.sumission.data[2] = $scope.totalOil;
    }
  }]);
'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('chart', {
        url: '/chart',
        templateUrl: 'app/chart/chart.html',
        controller: 'ChartCtrl'
      });
  }]);
'use strict';

angular.module('petroApp')
  .controller('CommentCtrl', ["$scope", "$http", "socket", function ($scope, $http, socket) {
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
  }]);

'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('comment', {
        url: '/dashboard/comment',
        templateUrl: 'app/dashboard/comment/comment.html',
        controller: 'CommentCtrl'
      });
  }]);
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
  .controller('DashboardCtrl', ['$scope', '$http', '$q', '$timeout', '$rootScope', 'XLS', function ($scope, $http, $q, $timeout, $rootScope, XLS) {

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

    $rootScope.$watch('$scope.wellFile', function () {
      $scope.wellFile =  $scope.wellFile;
    });

    // function upload(files) {
    //   if (files && files.length) {
    //     console.log(files);
    //   }

    // }

    $scope.uploadFile = function () {
      console.log($scope.wellFile);

      if (!$scope.wellFile) return alert('Please select a file');

      XLS.extractData($scope.wellFile[0])
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




'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  }]);
/**
 * Created by Adeel<mr.adi180@gmail.com> on 6/17/2015.
 */
var app = angular.module('petroApp')
  .directive('uploadFile', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {

        //Here we get the model of file
        var fileModel = $parse(attr.ngModel);

        //Assignment of file to model
        var fileSetter = fileModel.assign;

        elem.bind('change', function (evt){
          if(!elem[0].files[0]) return;
          var fileName = elem[0].files[0].name;
          var splitedName = fileName.split('.');
          /*if(splitedName[splitedName.length-1] !=  'csv'){
            elem.replaceWith( elem = elem.clone( true ) );
            return alert('Please select the CSV File');
          }*/
          fileSetter(scope, elem[0].files[0])
        });
      }
    }
  }]);
'use strict';

var words = ['in-depth mathematics', 'robust engineering', 'valuable interpretation', 'advanced visualization'];
var numOfWords = words.length;
var counter = 0;

angular.module('petroApp')
  .controller('MainCtrl', ["$scope", "$http", "socket", function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    //main content and rotation

setInterval(function() {
  //make the fing thing rotate
  $('#spinner').toggleClass('rotate');
  //
}, 1750);

setInterval(function() {

  var coreAnim = function(){
    var live = $('.live');
    var bottom = $('.bottom');

     //live moves to top and hide
     live.animate({
      opacity: 0.0,
      marginTop: "-100px"
    }, 1000, 'linear', function(){
      live.removeClass('live').addClass('bottom hidden');
      live.removeAttr('style');
    });
     //bottom unhide moves to live
     bottom.text(words[counter]);
     bottom.removeClass("hidden");
     bottom.animate({
      opacity: 1.0,
      marginTop: "0px"
    }, 1000, 'linear', function(){
      bottom.removeClass('bottom').addClass('live');
      bottom.removeAttr('style');
    });
  };

  var updateCounter = function(){
    if((counter + 1) === numOfWords){
      counter = 0;
    } else {
      counter++;
    }
  };

  var cleanUp = function(){
    var item = $('.bottom');
    var after = item.next();
    item.insertAfter(after);
  };

  coreAnim();
  updateCounter();
  cleanUp();

}, 3500);


  // clearing the input field after users clicks submit button

  $scope.clearField = function () {
    $scope.emailInput = " ";
  }

  // var scene = new THREE.Scene();
  //     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  //     var renderer = new THREE.WebGLRenderer();
  //     renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
  //     document.body.appendChild( renderer.domElement );

  //     var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //     var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  //     var cube = new THREE.Mesh( geometry, material );
  //     scene.add( cube );

  //     camera.position.z = 5;

  //     var render = function () {
  //       requestAnimationFrame( render );

  //       cube.rotation.x += 0.1;
  //       cube.rotation.y += 0.1;

  //       renderer.render(scene, camera);
  //     };

  //     render();

  }]);

'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }]);
'use strict';

angular.module('petroApp')
  .controller('TableCtrl', ["$scope", "$location", "$http", "Auth", "XLS", function ($scope, $location, $http, Auth, XLS) {
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
  }]);

'use strict';

angular.module('petroApp')
  .directive('petroChart', ["$q", "$parse", function($q, $parse) {

    function extractLine(data, x, y) {
      var minX = +Infinity;
      var maxX = -Infinity;
      var minY = +Infinity;
      var maxY = -Infinity;

      var data = _(data)
        .chain()
        .reduce(function(acc, row) {
          var date = moment(row[x.column], x.format).format();
          var value = +row[y];
          if (!acc[date] && !_.isNaN(value)) {
            acc[date] = value;
          }
          return acc;
        }, {})
        .map(function(v, k) {
          var x = new Date(k);
          minX = _.min([minX, x]);
          maxX = _.max([maxX, x]);
          minY = _.min([minY, v]);
          maxY = _.max([maxY, v]);
          return { x: x, y: v };
        })
        .value();

      var ndx = crossfilter(data);
      var dim = ndx.dimension(dc.pluck('x'));

      return {
        dim: dim,
        group: dim.group().reduceSum(dc.pluck('y')),
        minX: minX, maxX: maxX,
        minY: minY, maxY: maxY
      };
    }

    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var state = $parse(attrs.state)(scope);
        var settings = state.settings;

        var chart = null;

        state.update = function(parsedData) {
          if (chart && chart.resetSVG) {
            chart.resetSVG();
          }
          if (parsedData) {
            var lines = _.map(settings.y, function(y) {
              return extractLine(parsedData.Data, settings.x, y.column);
            });

            chart = dc.compositeChart(elem.get(0));
            chart
              .x(d3.time.scale().domain([
                _.min(_.pluck(lines, 'minX')),
                _.max(_.pluck(lines, 'maxX'))
              ]))
              .yAxisLabel(settings.yAxis)
              .rightYAxisLabel(settings.rightYAxis)
              .renderHorizontalGridLines(true)
              .compose(_.map(lines, function(line, index) {
                var s = settings.y[index];
                var ch = dc[s.type](chart)
                  .dimension(line.dim)
                  .group(line.group, s.column)
                  .colors(s.color);
                if (s.rightY) {
                  ch.useRightYAxis(true);
                }
                return ch;
              }))
              .brushOn(false)
              .render();
          }
        };

        scope.$destroy(function() {
          if (chart && chart.resetSVG) {
            chart.resetSVG();
          }
        });
      }
    };
  }]);

'use strict';

angular.module('petroApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('table', {
        url: '/table',
        templateUrl: 'app/table/table.html',
        controller: 'TableCtrl'
      });
  }]);
'use strict';

angular.module('petroApp')
  .factory('Auth', ["$location", "$rootScope", "$http", "User", "$cookieStore", "$q", function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  }]);

'use strict';

angular.module('petroApp')
  .factory('User', ["$resource", function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  }]);

'use strict';

angular.module('petroApp')
  .factory('Modal', ["$rootScope", "$modal", function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  }]);

'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('petroApp')
  .directive('mongooseError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  });
'use strict';

angular.module('petroApp')
  .controller('NavbarCtrl', ["$scope", "$location", "Auth", function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
'use strict';

angular.module('petroApp')
  .controller('SidebarCtrl', ["$scope", "$location", "Auth", function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Sidebar',
      'link': '/dashboard'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
/* global io */
'use strict';

angular.module('petroApp')
  .factory('socket', ["socketFactory", function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array, cb) {
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  }]);

'use strict';

angular.module('petroApp')
  .factory('XLS', ["$q", function($q) {

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

    return {
      extractData: extractData
    };
  }]);

angular.module('petroApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=col-md-3></div><div class=\"row login-row col-md-6\"><h1>Login</h1><!-- <p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p>\n" +
    "    <p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p> --><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required></div><div class=form-group><input type=password name=password class=form-control ng-model=user.password placeholder=Password required></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class=\"btn btn-primary btn-lg btn-login\" type=submit>Login</button><!-- <a class=\"btn btn-default btn-lg btn-register\" href=\"/signup\">\n" +
    "          Register\n" +
    "        </a> --></div><!--\n" +
    "        <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div> --></form><hr></div><div class=col-md-3></div></div>"
  );


  $templateCache.put('app/account/settings/settings.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=col-md-3></div><div class=\"row col-md-6\"><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\"><input name=name class=form-control ng-model=user.name placeholder=\"Your Name\" required><p class=help-block ng-show=\"form.name.$error.required && submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\"><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\"><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 placeholder=Password required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class=\"btn btn-primary btn-lg btn-login\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-register\" href=/login>Login</a></div><!-- <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div> --></form></div></div><div class=col-md-3></div><hr></div>"
  );


  $templateCache.put('app/admin/admin.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><p>The delete user and user index api routes are restricted to users with the 'admin' role.</p><ul class=list-group><li class=list-group-item ng-repeat=\"user in users\"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class=\"glyphicon glyphicon-trash pull-right\"></span></a></li></ul></div>"
  );


  $templateCache.put('app/chart/chart.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/sidebar/sidebar.html'\"></div><div id=wrapper><div id=page-wrapper><div ng-show=isLoading class=\"col-sm-12 text-center\"><div class=progress><div class=progress-bar role=progressbar aria-valuenow={{progress}} aria-valuemin=0 aria-valuemax=100 style=\"{{'width: '+ progress + '%'}}\"></div></div><button ng-click=generateCharts() type=button class=\"btn btn-primary\">Calculate data</button></div><div class=row ng-if=!isLoading><!--Submissoins--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-pie-chart fa-fw\"></i> Submission of Oil, Water and Gas</div><div class=panel-body><canvas class=\"chart chart-doughnut chart-xs\" data=sumission.data labels=sumission.labels legend=true></canvas></div></div></div><!--Highest Oil--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-pie-chart fa-fw\"></i> Highest Oil</div><div class=panel-body><canvas class=\"chart chart-doughnut chart-xs\" data=highestOil.data labels=highestOil.labels legend=true></canvas></div></div></div><!--Bar Chart--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-bar-chart fa-fw\"></i> Bar Chart</div><div class=panel-body><canvas id=bar class=\"chart chart-bar\" data=barChartData.data labels=barChartData.labels series=barChartData.series></canvas></div></div></div><!--Line Chart--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-line-chart fa-fw\"></i> Line Chart</div><div class=panel-body><canvas id=line class=\"chart chart-line\" data=lineChartData.data labels=lineChartData.labels series=lineChartData.series></canvas></div></div></div><!--Line Chart--><!-- <div class=\"col-lg-6 col-sm-12\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Line Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas class=\"chart chart-bar\" data=\"barChartData.data\" labels=\"barChartData.labels\" series=\"barChartData.series\"\n" +
    "              ></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>--><!--<div class=\"col-lg-6 col-sm-12\" id=\"radar-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Radar Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"area\" class=\"chart chart-radar\" data=\"radar.data\" labels=\"radar.labels\" click=\"onClick\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6 col-sm-12\" id=\"pie-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Pie Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"pie\" class=\"chart chart-pie chart-xs\" data=\"pie.data\" labels=\"pie.labels\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6 col-sm-12\" id=\"polar area-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Polar Area Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"polar\" class=\"chart chart-polar-area\" data=\"polar.data\" labels=\"polar.labels\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6 col-sm-12\" id=\"base-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Dynamic Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"base\" class=\"chart chart-base\" chart-type=\"dynamic.type\" data=\"dynamic.data\"\n" +
    "                  labels=\"dynamic.labels\" legend=\"true\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <button type=\"button\" class=\"btn btn-primary pull-right\" ng-click=\"dynamic.toggle()\">Toggle</button>\n" +
    "    </div>--></div></div></div>"
  );


  $templateCache.put('app/dashboard/comment/comment.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><iframe width=100% height=410 src=//www.youtube.com/embed/DcJFdCmN98s frameborder=0></iframe><form class=comment-form ng-submit=addComment() name=commentForm><textarea class=form-control ng-model=newComment rows=3 placeholder=\"Enter a new comment\" required></textarea><input class=\"btn btn-primary\" type=submit ng-disabled=commentForm.$invalid value=Post></form><ul class=comment-list><li ng-repeat=\"comment in comments\"><header>{{ comment.author.name }}</header><p>{{ comment.content }}</p></li></ul></div>"
  );


  $templateCache.put('app/dashboard/dashboard.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/sidebar/sidebar.html'\"></div><div id=wrapper><div id=page-wrapper><!-- /.panel --><div class=row><div class=\"col-sm-12 mapArea\"><div id=map_canvas><map></map></div></div><div class=\"col-lg-12 tableArea\"><div class=\"panel panel-default\"><div class=panel-heading><!--             <i class=\"fa fa-clock-o fa-fw\"></i> Responsive Timeline\n" +
    " --><!-- real time socket.io --><div class=main-box><h2 class=page-header>Import Wells</h2><!-- <ul class=\"nav nav-tabs nav-stacked\" ng-repeat=\"thing in awesomeThings\">\n" +
    "                <li><a href=\"#\" tooltip=\"{{thing.info}}\">{{thing.name}}\n" +
    "                  <button type=\"button\" class=\"close\" ng-click=\"deleteThing(thing)\">&times;</button>\n" +
    "                </a></li>\n" +
    "              </ul> --><form class=thing-form><!-- <label>Table Syncs in realtime</label>\n" +
    "                <p class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter well name\" ng-model=\"newThing\"/>\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                  <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"addThing()\">Add Well(s)</button>\n" +
    "                </span>\n" +
    "                </p>\n" +
    " --><h5>Import an excel file.</h5><p class=input-group><input type=file class=form-control ngf-select ng-model=\"wellFile\"><!--<div class=\"button btn btn-primary\" ngf-select ng-model=\"wellFile\">upload photo</div>--> <span class=input-group-btn><button type=submit class=\"btn btn-primary\" ng-click=uploadFile()>Import Well(s)</button></span></p></form><!-- importing the table using Smart Table\n" +
    "              <button type=\"button\" ng-click=\"addRandomItem(row)\" class=\"btn btn-sm btn-success\"><i\n" +
    "                  class=\"glyphicon glyphicon-plus\"></i> Add random well\n" +
    "              </button>--><table st-table=displayedCollection st-safe-src=rowCollection class=\"table table-striped col-md-12 table-hover table-bordered\"><thead><tr><th class=center st-sort=wellName>Well Name</th><th class=center st-sort=latitude>Wellhead Latitude</th><th class=center st-sort=longitude>Wellhead Longitude</th><th class=center st-sort=apiNumber>API Number</th><th class=center st-sort=operator>Operator</th><th class=center st-sort=status>Status</th><th class=center st-sort=rsvCat>RSV_CAT</th><th class=center st-sort=latLength>LAT_LENGTH</th><th class=center st-sort=stage>Stages</th><th class=center st-sort=fpd>FPD</th><th class=center st-sort=oil>Total_Oil</th><th class=center st-sort=gas>Total_Gas</th><th class=center st-sort=water>Total_Water</th><!--th st-sort=\"balance\">balance</th> --></tr><tr><th colspan=13><input st-search=\"\" class=form-control placeholder=\"global search ...\"></th></tr></thead><tbody><tr ng-repeat=\"row in displayedCollection | orderBy: 'name'\" class=center><td class=odd><a href=#>{{row.name}}</a></td><td class=even>{{row.latitude}}</td><td class=odd>{{row.longitude}}</td><td class=even>{{row.apiNumber}}</td><td class=odd>{{row.operator}}</td><td class=even>{{row.status}}</td><td class=odd>{{row.rsvCat}}</td><td class=even>{{row.latLength}}</td><td class=odd>{{row.stages}}</td><td class=even>{{row.fpd | date:'EEEE, MMMM d, y'}}</td><td class=odd>{{row.oil}}</td><td class=even>{{row.gas}}</td><td class=odd>{{row.water}}</td><td><button type=button ng-click=removeItem(row) class=\"btn btn-sm btn-danger\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button></td></tr></tbody></table><h5 id=names ng-click=hide()>This is where the names should be appeared!</h5></div><!-- /.panel-heading --><timeline></timeline><!-- /.panel-body --></div><!-- /.panel --></div><!-- /.col-lg-8 --><!--\n" +
    "        <div class=\"col-lg-4\">\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "              <i class=\"fa fa-bell fa-fw\"></i> Notifications Panel\n" +
    "                --><!-- Google Maps --><!--\n" +
    "        <div id=\"map\"></div>\n" +
    "          <div id=\"class\" ng-repeat=\"marker in markers | orderBy : 'title'\">\n" +
    "           <a href=\"#\" ng-click=\"openInfoWindow($event, marker)\">{{marker.title}}</a>\n" +
    "          </div>\n" +
    "        </div> --><!-- /.panel-heading --><notifications></notifications><!-- /.panel-body --></div><!-- /.panel --><chat></chat><!-- /.panel .chat-panel --></div></div></div>"
  );


  $templateCache.put('app/main/main.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><!-- <header class=\"hero-unit\" id=\"banner\">\n" +
    "  <div class=\"col-sm-3 col-lg-3 col-md-3\"></div>\n" +
    "  <div class=\"container col-sm-6 col-lg-6 col-md-6\"> --><!-- <h1>We Made <u>Analytics</u> Simple.</h1>\n" +
    "      <p class=\"lead\">A revolution in analyzing data.</p>\n" +
    "      <a href=\"#main_content\" type=\"button\" class=\"btn btn-success\">Learn more</a> --><!-- </div>\n" +
    "  <div class=\"col-sm-3 col-lg-3 col-md-3\"></div>\n" +
    "</header> --><div class=\"container mainContent\"><div class=mainBox><div id=centerMe><div class=floatLeft><div class=title>analytics</div><div id=spinner class=\"title rotate\">+</div></div><div id=textWrapper><div class=\"title live\">advanced visualization</div><div class=\"title bottom hidden\"></div></div></div><hr><form class=box><input class=emailInput type=email placeholder=\"email address\" ng-model=emailInput required><input class=submitButton type=submit value=subscribe ng-click=clearField()></form></div></div><!-- Wrap all page content here --><!-- <div id=\"wrap\">\n" +
    "  <header class=\"masthead\"> --><!-- Begin page content --><!-- <div class=\"divider\" id=\"section1\"></div>\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "      <div class=\"page-header text-center\" id=\"main_content\">\n" +
    "        <h1>It's all about <strong>DATA</strong>.</h1>\n" +
    "      </div>\n" +
    "      \n" +
    "      <p class=\"lead text-center\"> \n" +
    "        Petrolytics will help oil and gas industry to analyze data in a more efficent way.\n" +
    "      </p> \n" +
    "      \n" +
    "      <hr>\n" +
    "      \n" +
    "      <div class=\"divider\"></div>\n" +
    "      \n" +
    "    </div>\n" +
    "  </div>\n" +
    "      \n" +
    "  <div class=\"divider\"></div>\n" +
    "    \n" +
    "  <section class=\"bg-1\">\n" +
    "    <div class=\"col-sm-6 col-sm-offset-3 text-center\"></div>\n" +
    "  </section>\n" +
    "    \n" +
    "  <div class=\"divider\" id=\"section2\"></div>\n" +
    "     \n" +
    "  <div class=\"row\">\n" +
    "      <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "        <h1>Profile</h1>\n" +
    "        \n" +
    "        <hr>\n" +
    "       \n" +
    "        <p>\n" +
    "      The Firm has had a great deal of experience and is highly regarded for its expertise in the areas of design, construction administration, construction management, tight cost control and scheduling.\n" +
    "      </p> \n" +
    "        <p>\n" +
    "      We have been involved in a wide range of building projects, including college facilities, banks, schools, nursing homes, office buildings, churches, industrial buildings and major urban development projects.\n" +
    "        </p> \n" +
    "        <p>\n" +
    "      The various projects have included new construction, renovation and adaptive re-use as a way of providing new space for the various clients. Tessier Associates provides in-house programming, master planning, architectural design, construction documentation, project administration and interior design services. Sustainable design, as appropriate for each client, is incorporated in cost effective ways to benefit the long term value of the buildings created by the firm.\n" +
    "      </p> \n" +
    "        <p>\n" +
    "      Together with selected consultants, The Firm provides complete professional services including landscape architecture, structural engineering, electrical and mechanical engineering and site planning.\n" +
    "      </p> \n" +
    "        \n" +
    "        <hr>\n" +
    "        \n" +
    "        <div class=\"divider\"></div> --><!-- </div> --><!--/col--><!-- </div> --><!--/container--><!-- <div class=\"divider\" id=\"section3\"></div>\n" +
    "  <div class=\"bg-4\">\n" +
    "    <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "       <div class=\"col-sm-4 col-xs-6\">\n" +
    "        \n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Renovations\"><img src=\"//placehold.it/600x400/444/F8F8F8\" class=\"img-responsive\"></a></div>\n" +
    "            <div class=\"panel-body\">\n" +
    "              <p>Renovations</p>\n" +
    "              <p></p>\n" +
    "  \n" +
    "            </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Academic Institutions\"><img src=\"//placehold.it/600x400/454545/FFF\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Academic Institutions</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Interiors\"><img src=\"//placehold.it/600x400/555/F2F2F2\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Interiors</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"New Construction\"><img src=\"//placehold.it/600x400/555/FFF\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>New Construction</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Site Planning\"><img src=\"//placehold.it/600x400/555/EEE\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Site Planning</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Churches\"><img src=\"//placehold.it/600x400/666/F4F4F4\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Churches</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- </div> --><!--/row--><!-- </div> --><!--/container--><!-- <div class=\"divider\"></div>\n" +
    "  <section class=\"bg-3\">\n" +
    "    <div class=\"col-sm-6 col-sm-offset-3 text-center\"><h2 style=\"padding:20px;background-color:rgba(5,5,5,0.5)\">A simple \"Hi\", will break the ices in between.</h2></div>\n" +
    "    <br />\n" +
    "    <a type=\"button\" class=\"btn btn-primary\" href=\"mailto:#first.last@example.com\" class=\"col-sm-3 col-sm-offset-3 text-center btn btn-primary\"><h5 style=\"padding:15px; positions: center;\">Send us a message</h5></a>\n" +
    "  </section>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"divider\" id=\"section4\"></div>\n" +
    "  \n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-8 col-md-offset-1\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "    \n" +
    "  <div class=\"row\">\n" +
    "    \n" +
    "    <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "        <h1>Location</h1>\n" +
    "    </div>   \n" +
    "         \n" +
    "    <div id=\"map-canvas\"></div>\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"col-sm-8\"></div>\n" +
    "    <div class=\"col-sm-3 pull-right\">\n" +
    "  \n" +
    "        <address>\n" +
    "          Petrolytics, Inc.<br>\n" +
    "          <span id=\"map-input\">\n" +
    "          1500 Wynden Street<br>\n" +
    "          Houston, TX 77027</span><br>\n" +
    "          P: (413) 700-5999\n" +
    "        </address>\n" +
    "      \n" +
    "        <p>\n" +
    "          <strong></strong><br>\n" +
    "          <a type=\"button\" class=\"btn btn-primary\" href=\"mailto:#first.last@example.com\">Hi there, ...</a>\n" +
    "        </p>          \n" +
    "    </div> --><!-- </div> --><!--/row--><!-- <div class=\"divider\" id=\"section5\"></div>  \n" +
    "  <div class=\"row\">\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"col-sm-9 col-sm-offset-1\">\n" +
    "        \n" +
    "        <div class=\"row form-group\">\n" +
    "          <div class=\"col-md-12\">\n" +
    "          <h1>Contact Us</h1>        \n" +
    "          </div>\n" +
    "          <div class=\"col-xs-4\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"firstName\" name=\"name\" placeholder=\"Your Name\">\n" +
    "          </div>\n" +
    "          <div class=\"col-xs-6\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"organization\" name=\"organization\" placeholder=\"Company or Organization\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"row form-group\">\n" +
    "            <div class=\"col-xs-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"email\" placeholder=\"Email\">\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"phone\" placeholder=\"Phone\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row form-group\">\n" +
    "            <div class=\"col-xs-10\">\n" +
    "              <textarea class=\"form-control\" placeholder=\"Comments\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row form-group\">\n" +
    "            <div class=\"col-xs-10\">\n" +
    "              <button class=\"btn btn-default pull-right\">Contact Us</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/row--><!--\n" +
    "  <ul class=\"list-inline center-block\">\n" +
    "    <li><a href=\"http://facebook.com/petrolytics\"><img src=\"../../assets/images2/soc_fb.png\"></a></li>\n" +
    "    <li><a href=\"http://twitter.com/petrolytics\"><img src=\"../../assets/images2/soc_tw.png\"></a></li>\n" +
    "    <li><a href=\"http://google.com/+petrolytics\"><img src=\"../../assets/images2/soc_gplus.png\"></a></li>\n" +
    "  </ul>\n" +
    "  --><!--  </div> --><!--/col--><!-- </div> --><!--/container--><!-- </div> --><!--/wrap--><!-- <ul class=\"nav pull-right scroll-top\">\n" +
    "  <li><a href=\"#banner\" title=\"Scroll to top\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a></li>\n" +
    "  </ul> --><!-- <div class=\"modal\" id=\"myModal\" role=\"dialog\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "  <div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button class=\"close\" type=\"button\" data-dismiss=\"modal\">×</button>\n" +
    "    <h3 class=\"modal-title\"></h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div id=\"modalCarousel\" class=\"carousel\">\n" +
    "  \n" +
    "          <div class=\"carousel-inner\">\n" +
    "           \n" +
    "          </div>\n" +
    "          \n" +
    "          <a class=\"carousel-control left\" href=\"#modaCarousel\" data-slide=\"prev\"><i class=\"glyphicon glyphicon-chevron-left\"></i></a>\n" +
    "          <a class=\"carousel-control right\" href=\"#modalCarousel\" data-slide=\"next\"><i class=\"glyphicon glyphicon-chevron-right\"></i></a>\n" +
    "          \n" +
    "        </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n" +
    "   </div>\n" +
    "  </div>\n" +
    "  </div> --><footer class=footer><div class=\"col-sm-3 col-lg-3 col-md-3\"><!-- <div class=\"footerLeft\">\n" +
    "      <span href=\"#\">About</span> | Contact Us\n" +
    "    </div> --></div><div class=\"col-sm-3 col-lg-3 col-md-3\"></div><div class=\"col-sm-6 col-lg-6 col-md-6 text-center\"><div class=footerRight>Made with <span><i class=\"fa fa-heart-o heart\"></i></span> in Houston.</div></div></footer>"
  );


  $templateCache.put('app/table/table.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/sidebar/sidebar.html'\"></div><div id=wrapper><div id=page-wrapper><div class=row><div class=col-lg-12><h2 class=page-header>EUR Chart</h2><form class=thing-form><h5>Import an excel file.</h5><p class=input-group><input type=file ngf-select ngf-change=uploadFile($files) ngf-multiple=multiple class=form-control> <span class=input-group-btn><button type=submit class=\"btn btn-primary\" ng-click=uploadFile()>Import Well(s)</button></span></p></form></div></div><div class=row><div class=col-md-4><div id=map_canvas><map></map></div><div class=\"panel panel-default\"><table class=\"table table-striped table-bordered table-hover\"><tbody><tr class=odd><td>Well Name</td><td>Well A</td></tr><tr class=even><td>API 10</td><td>32132141</td></tr><tr class=odd><td>API 14</td><td>8445437422234</td></tr><tr class=even><td>County</td><td>Karnes</td></tr><tr class=odd><td>District</td><td>7B</td></tr><tr class=even><td>Field</td><td>EF</td></tr><tr class=odd><td>Lease</td><td>Johnson 2B</td></tr><tr class=even><td>Date Drilled</td><td>Jan 05, 2012</td></tr><tr class=odd><td>Completion Date</td><td>Feb 12, 2012</td></tr><tr class=even><td>Current Status</td><td>Producing</td></tr></tbody></table></div></div><div class=col-md-4><div petro-chart state=lineChartState></div><div petro-chart state=barChartState></div></div><div class=col-md-4><div class=row><div class=\"col-md-6 tile\"><h3>LL</h3><h2>5180 <small>R</small></h2></div><div class=\"col-md-6 tile\"><h3>lb/ft</h3><h2>1230 <small>lbs</small></h2></div><div class=\"col-md-6 tile\"><h3>EUR</h3><h2>510 <small>MBOE</small></h2></div><div class=\"col-md-6 tile\"><h3>WC</h3><h2>16%</h2></div></div></div></div><div class=row><div class=col-md-9><div class=\"panel panel-default\"><table class=\"table table-striped table-bordered table-hover\"><thead><tr><th>Date</th><th>Original Gas Rate (MCFD)</th><th>Gas Cum Forecast</th><th>Forecast Rate (MCFD)</th><th>Year</th><th>Cum. Cash 8%</th></tr></thead><tbody><tr ng-repeat=\"row in statistics\"><td ng-bind=\"::row['Date']\"></td><td ng-bind=\"::row['Original Gas Rate (MCFD)']\" class=text-right></td><td ng-bind=\"::row['Gas Cum forecast']\" class=text-right></td><td ng-bind=\"::row['Forecast Rate (MCFD)']\" class=text-right></td><td ng-bind=\"::row['Year']\"></td><td ng-bind=\"::row['Cum. Cash 8%']\" class=text-right></td></tr></tbody></table></div></div><div class=col-md-3><div class=\"panel panel-default\"><table class=\"table table-striped table-bordered table-hover\"><thead><tr><th>Output Result</th><th>Value</th></tr></thead><tbody><tr ng-repeat=\"row in statistics\" ng-if=\"::row['OUTPUT RESULT']\"><td ng-bind=\"::row['OUTPUT RESULT']\"></td><td ng-bind=\"::row['VALUE']\" class=text-right></td></tr></tbody></table></div></div></div></div></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div class=\"navbar navbar-default navbar-static-top\" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click=\"isCollapsed = !isCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href=\"/\" class=navbar-brand><span><img class=logoImage src=../../assets/images/p2.png></span></a></div><div collapse=isCollapsed class=\"navbar-collapse collapse\" id=navbar-main><ul class=\"nav navbar-nav\"><li ng-repeat=\"item in menu\" ng-class=\"{active: isActive(item.link)}\"><a ng-href={{item.link}}>{{item.title}}</a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/admin')}\"><a href=/admin>Admin</a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/dashboard')}\"><a href=/dashboard>Dashboard</a></li><!-- <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/dashboard/comment')}\"><a href=\"/dashboard/comment\">Comments</a></li> --></ul><ul class=\"nav navbar-nav navbar-right\"><!-- <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/signup')}\"><a href=\"/signup\">Sign up</a></li> --><li ng-hide=isLoggedIn() ng-class=\"{active: isActive('/login')}\"><a href=/login>Login</a></li><li ng-show=isLoggedIn()><p class=navbar-text>Hello {{ getCurrentUser().name }}</p></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/settings')}\"><a href=/settings><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/logout')}\"><a href=\"\" ng-click=logout()>Logout</a></li></ul></div></div></div>"
  );


  $templateCache.put('components/sidebar/sidebar.html',
    "<div class=\"navbar-default sidebar\" role=navigation><div class=\"sidebar-nav navbar-collapse\"><ul class=\"nav in\" id=side-menu><sidebar-search></sidebar-search><li class=sidebar-search><div class=\"input-group custom-search-form\"><input class=form-control placeholder=Search...> <span class=input-group-btn><button class=\"btn btn-default\" type=button><i class=\"fa fa-search\"></i></button></span></div></li><li ui-sref-active=active><a href=/dashboard><i class=\"fa fa-dashboard fa-fw\"></i> Dashboard</a></li><li ui-sref-active=active><a href=/chart><i class=\"fa fa-bar-chart-o fa-fw\"></i> Charts<span></span></a></li><li ui-sref-active=active><a href=/table><i class=\"fa fa-table fa-fw\"></i> EUR Data</a></li><!--\n" +
    "            <li ui-sref-active=\"active\">\n" +
    "                <a ui-sref=\"dashboard.form\"><i class=\"fa fa-edit fa-fw\"></i> Forms</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active: collapseVar==1}\">{{dropDown}}\n" +
    "                <a href=\"\" ng-click=\"check(1)\"><i class=\"fa fa-wrench fa-fw\"></i> UI Elements<span\n" +
    "                        class=\"fa arrow\"></span></a>\n" +
    "                <ul class=\"nav nav-second-level\" collapse=\"collapseVar!=1\">\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.panels-wells\">Panels and Wells</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.buttons\">Buttons</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.notifications\">Notifications</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.typography\">Typography</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.icons\"> Icons</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.grid\">Grid</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                &lt;!&ndash; /.nav-second-level &ndash;&gt;\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active: collapseVar==2}\">\n" +
    "                <a href=\"\" ng-click=\"check(2)\"><i class=\"fa fa-sitemap fa-fw\"></i> Multi-Level Dropdown<span\n" +
    "                        class=\"fa arrow\"></span></a>\n" +
    "                <ul class=\"nav nav-second-level\" collapse=\"collapseVar!=2\">\n" +
    "                    <li>\n" +
    "                        <a href=\"\">Second Level Item</a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"\">Second Level Item</a>\n" +
    "                    </li>\n" +
    "                    <li ng-init=\"third=!third\" ng-class=\"{active: multiCollapseVar==3}\">\n" +
    "                        <a href=\"\" ng-click=\"multiCheck(3)\">Third Level <span class=\"fa arrow\"></span></a>\n" +
    "                        <ul class=\"nav nav-third-level\" collapse=\"multiCollapseVar!=3\">\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "\n" +
    "                        </ul>\n" +
    "                        &lt;!&ndash; /.nav-third-level &ndash;&gt;\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                &lt;!&ndash; /.nav-second-level &ndash;&gt;\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active:collapseVar==4}\">\n" +
    "                <a href=\"\" ng-click=\"check(4)\"><i class=\"fa fa-files-o fa-fw\"></i> Sample Pages<span\n" +
    "                        class=\"fa arrow\"></span></a>\n" +
    "                <ul class=\"nav nav-second-level\" collapse=\"collapseVar!=4\">\n" +
    "                    <li ng-class=\"{active: selectedMenu=='blank'}\">\n" +
    "                        <a ui-sref=\"dashboard.blank\" ng-click=\"selectedMenu='blank'\">Blank Page</a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a ui-sref=\"login\">Login Page</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                &lt;!&ndash; /.nav-second-level &ndash;&gt;\n" +
    "            </li>--></ul></div><!-- /.sidebar-collapse --></div>"
  );

}]);

