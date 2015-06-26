'use strict';

angular.module('petroApp')
  .factory('XLS', function($q) {

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
  });
