/*global angular*/

angular.module('bioshockMain')
  .directive('khEnter', function () {
    'use strict';
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if(event.which === 13 && !event.ctrlKey && !event.altKey && !event.shiftKey) {
          scope.$apply(function (){
            scope.$eval(attrs.khEnter);
          });

          event.preventDefault();
        }
      });
    };
  })
;