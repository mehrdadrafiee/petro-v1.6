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