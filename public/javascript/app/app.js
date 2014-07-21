'use strict';

var movie_app = angular.module('movieApp', ['ui.bootstrap']);

movie_app.controller('MovieCtrl', [
             '$scope', 
    function ($scope) {
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
              body: "Manure! I hate manure!",
              author: "Biff"
            },
            {
              body: "That's about as funny as a screen door on a battleship.",
              author: "Biff"
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
          return this.comment.$invalid
        };

    }]
);