(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

// $(document).ready(function () {
//     $(window).on('load scroll', function () {
//         var scrolled = $("#video").scrollTop();
//         $('#video').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
//     });
var myApp = angular.module('myApp', []);
myApp.controller('mainCtrl', function ($scope, $http){
  
  $http.get('http://api.randomuser.me/?results=24').success(function(data) {
    $scope.users = data.results;
  }).error(function(data, status) {
    alert('get data error!');
  });
  
  $scope.removeUser = function(user){
     $scope.users.splice($scope.users.indexOf(user),1);
  };
  
  $scope.modalDetails = function(user){
     $scope.user = user;
     $('#modalDetails').openModal();
  };
  
});