/*global angular*/

angular.module('bioshockMain')
  .directive('usernameDropdown', function($http, $location, $modal, defModel, khAccountAccount, khAccountToken) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/username-dropdown.html',
      scope: {},
      link: function (scope) {
        defModel.registerObserver(function () {
          scope.username = defModel.data.username;
          scope.currentListName = defModel.data.currentListName;
          scope.listnames = defModel.data.listnames;
        });

        scope.openAbout = function () {
          $modal.open({
            templateUrl: 'views/about-popup.html',
            controller: 'PopupCtrl',
            animation: false
          });
        };

        scope.switchList = function (listIndex) {
          $http.get('/api/token/' + listIndex).then(
            function (res) {
              khAccountToken.setToken(res.data.token);
              defModel.getDefs();
            }
          );
        };

        scope.logoff = function () {
          khAccountAccount.logoff();
        };
      }
    };
  });