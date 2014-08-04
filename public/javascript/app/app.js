'use strict';

var movie_app = angular.module('movieApp', ['ui.bootstrap', 'restangular']);

movie_app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.patch['Content-Type'] = 'application/json';
  $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}]);

movie_app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://workshops.briisk.co');
  RestangularProvider.setRequestSuffix('.json');
});



movie_app.controller('MovieCtrl', [
             '$scope', '$modal', 
    function ($scope,   $modal) {

      $scope.open = function (movie) {

        var modalInstance = $modal.open({
          templateUrl: 'templates/movie.html',
          controller: 'MovieInstanceCtrl',
          resolve: {
            movie: function () {
              return movie;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
        });

      };


    }]
);

movie_app.controller('MovieInstanceCtrl', [
              '$scope', '$modalInstance', 'movie',
      function($scope,   $modalInstance,   movie){

        $scope.movie = movie;

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };

        $scope.user = {
          name: "Biff",
          rate: 0
        };

        $scope.tmp = {
          current_comment: ""
        };

        $scope.addComment = function() { 
          var comment = {
            body: $scope.tmp.current_comment,
            author: $scope.user.name
          }
          $scope.movie.comments.push(comment);
          $scope.tmp.current_comment = "";
        };

      }]
);

movie_app.controller('MovieListCtrl', [
             '$scope', 'Restangular', 
    function ($scope,   Restangular) {
        $scope.movies = [];
        $scope.search = {
          title: ""
        };
        $scope.user = {
          name: "Biff",
          rate: 0
        };
        $scope.tmp = {
          current_comment: ""
        };
        $scope.isCollapsed = true;

        Restangular.all('movies').getList()
        .then(function(movies) {
          $scope.movies = movies;
        });

        $scope.addComment = function(movie) { 
          var comment = {
            body: $scope.tmp.current_comment,
            user_name: $scope.user.name
          }
          movie.comments.push(comment);
          $scope.tmp.current_comment = "";
        };

    }]
);

movie_app.directive('searchBox',function() {
  return {
    restrict: 'EA',
    templateUrl: "templates/search_box.html"
  }
});

movie_app.directive('movieTitle',function() {
  return {
    restrict: 'EA',
    templateUrl: "templates/movie_title.html"
  }
});

movie_app.directive('rateMovie',function() {
  return {
    restrict: 'EA',
    templateUrl: "templates/rate_movie.html"
  }
});

movie_app.directive('activeRow', function () {
  return {
    link: function (scope, elem) {
      elem.bind('mouseenter', function () {
        elem.addClass('active-row');
      });
      elem.bind('mouseleave', function () {
        elem.removeClass('active-row');
      });
    }
  };
});
