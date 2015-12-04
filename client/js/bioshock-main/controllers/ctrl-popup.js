/*global angular*/

angular.module('bioshockMain')
  .controller('PopupCtrl', function ($scope, $modalInstance) {
    'use strict';
    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };
  })
;