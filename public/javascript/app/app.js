'use strict';

var movie_app = angular.module('movieApp', ['ui.bootstrap', 'restangular', 'ngAnimate', 'ui.router']);

movie_app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.patch['Content-Type'] = 'application/json';
  $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}]);

movie_app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://workshops.briisk.co');
  RestangularProvider.setRequestSuffix('.json');
});

movie_app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/movies");

  $stateProvider
    .state('movies', {
      url: "/movies",
      abstract: true,
      templateUrl: "templates/movies.html",
      controller: "MovieListCtrl"
    })
    .state('movies.list', {
      url: "",
      templateUrl: "templates/movies.list.html"
    })
    .state('movies.item', {
      url: "/:id",
      templateUrl: "templates/movies.item.html",
      controller: "MovieCtrl"
    })
  });



movie_app.controller('MovieCtrl', [
             '$scope', 'Restangular', '$stateParams', '$state', 
    function ($scope,   Restangular,   $stateParams,   $state) {

        $scope.id = parseInt($stateParams.id);

        var movie = $scope.$parent.movies.filter(function (el) {
          return el.id === $scope.id;
        });

        $scope.movie = movie[0]

        $scope.tmp = {
          current_comment: ""
        };
        $scope.user = {
          name: "Biff",
          rate: 0
        };

        $scope.addComment = function() { 
          var comment = {
            body: $scope.tmp.current_comment,
            user_name: $scope.user.name
          }
          $scope.movie.comments.push(comment);
          $scope.tmp.current_comment = "";
        };

        $scope.isAddDisabled = function() { 
          return $scope.post.$invalid
        };

        $scope.back = function() { 
          $state.go('movies.list');
        };
    }]
);

movie_app.controller('MovieListCtrl', [
             '$scope', 'Restangular', '$state',
    function ($scope,   Restangular,   $state) {
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
        
        $scope.likeTitle = function(title) {
          alert("Polubiłeś film " + title);
        }

        $scope.likeDirector = function(director) {
          alert("Polubiłeś reżysera " + director);
        }

        $scope.open = function(id) { 
          $state.go('movies.item', {id: id});
        };

    }]
);

movie_app.directive('likeSomething',function() {
  return {
    restrict: 'A',
    scope: {
      whatToLike: "=",
      showLike: "&"
    },
    link: function (scope, element, attrs) {
      element.append('<i id="like-something" class="glyphicon glyphicon-heart-empty"></i>');
      element.find('i#like-something').bind('click', function(){
        if(element.find('i.glyphicon').hasClass('glyphicon-heart-empty')) {
          element.find('i.glyphicon').removeClass('glyphicon-heart-empty');
          element.find('i.glyphicon').addClass('glyphicon-heart');
          element.find('i.glyphicon.glyphicon-heart').css('color', 'red');
          scope.showLike({whatToLike: attrs.whatToLike});
        } else {
          element.find('i.glyphicon').removeClass('glyphicon-heart');
          element.find('i.glyphicon').addClass('glyphicon-heart-empty');
          element.find('i.glyphicon.glyphicon-heart-empty').css('color', '');
        }
      });
    }
  }
});

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
