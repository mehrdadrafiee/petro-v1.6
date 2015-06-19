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
      data: [$scope.totalWater, $scope.totalGas, $scope.totalOil]
    };

    $scope.higestOil = {
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
          $scope.higestOil.data[0] = highestWell.water;
          $scope.higestOil.data[1] = highestWell.oil;
          $scope.higestOil.data[2] = highestWell.gas;

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
      $scope.higestOil.data[0] = highestWell.water;
      $scope.higestOil.data[1] = highestWell.oil;
      $scope.higestOil.data[2] = highestWell.gas;

      //After getting data from server, update the charts
      $scope.sumission.data[0] = $scope.totalWater;
      $scope.sumission.data[1] = $scope.totalGas;
      $scope.sumission.data[2] = $scope.totalOil;
    }
  }]);