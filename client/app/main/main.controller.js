'use strict';

var words = ['in-depth mathematics', 'robust engineering', 'valuable interpretation', 'advanced visualization'];
var numOfWords = words.length;
var counter = 0;

angular.module('petroApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
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
    $after = item.next();
    item.insertAfter($after);
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
    
  });
