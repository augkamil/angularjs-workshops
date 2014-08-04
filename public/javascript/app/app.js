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



movie_app.controller('MovieCtrl', [
             '$scope', 'Restangular', 
    function ($scope,   Restangular) {
        this.movie = {
          id: 1,
          title: "Powrót do przyszłości",
          director: "Robert Zemeckis",
          description: "W 1985 roku dr Emmett Brown buduje wehikuł czasu. Jego przyjaciel Marty McFly przenosi się w lata 50. i niechcący przeszkadza w poznaniu się swoim rodzicom.",
          time: 116,
          release: 1985,
          image: "http://1.fwcdn.pl/po/88/23/8823/7334729.6.jpg",
          average_rate: 7.3,
          comments: [
            {
              body: "asdadasd",
              author: "Tomek"
            },
            {
              body: "ghjhgjghjghjg",
              author: "Tomek"
            }
          ]
        };

        this.user = {
          name: "Biff",
          rate: 0
        };

        this.current_comment = "";

        this.addComment = function() { 
          var comment = {
            body: this.current_comment,
            author: this.user.name
          }
          this.movie.comments.push(comment);
          this.current_comment = "";
        };

        this.isAddDisabled = function() { 
          return this.post.$invalid
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
        
        $scope.likeTitle = function(title) {
          alert("Polubiłeś film " + title);
        }

        $scope.likeDirector = function(director) {
          alert("Polubiłeś reżysera " + director);
        }

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
