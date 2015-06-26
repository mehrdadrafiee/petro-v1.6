'use strict';

angular.module('petroApp')
  .directive('petroChart', function($q, $parse) {

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
  });
