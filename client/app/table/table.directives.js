'use strict';

angular.module('petroApp')
  .directive('petroChart', function($q, $parse) {
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

        state.notifyUpload = function(files) {
          if (chart && chart.resetSVG) {
            chart.resetSVG();
          }
          if (files && files[0]) {
            extractData(files[0])
              .then(function(parsedData) {
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
              });
          }
        };

        scope.$destroy(function() {
          if (chart && chart.resetSVG) {
            chart.resetSVG();
          }
        });
      }
    };
  });
