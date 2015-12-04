/*global angular*/

angular.module('khAccount')
  .factory('khAccountAccount', function ($http, $location, khAccountToken) {
    'use strict';
    var api = {};

    api.login = function (credentials) {
      return $http.post('/api/login', credentials)
        .success(function (res) {
          khAccountToken.setToken(res.token);
        });
    };

    //used in main module's route interceptor, in the .run block
    api.checkToken = function () {
      return $http.get('/api/token');
    };

    api.logoff = function () {
      khAccountToken.destroyToken();
      $location.path('/login');
    };

    api.createAccount = function (credentials) {
      return $http.post('api/users', credentials)
        .success(function (res) {
          khAccountToken.setToken(res.token);
        });
    };

    return api;
  })
;
