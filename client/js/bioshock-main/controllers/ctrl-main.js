/*global angular*/

angular.module('bioshockMain')
  .controller('bioshockMainController', function ($scope, $timeout) {
    'use strict';
    $scope.events = {
      defAdded: function (title) {
        $timeout(function () {
          $scope.$broadcast('defAdded', title);
        }, 100);
      },
      defEdit: function (title) {
        $timeout(function () {
          $scope.$broadcast('defEdit', title);
        }, 100);
      }
    };
  })
;