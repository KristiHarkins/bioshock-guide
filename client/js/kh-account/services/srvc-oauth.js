/*global angular, FB*/

angular.module('khAccount')
  .factory('khAccountOauth', function ($http, $q, khAccountToken) {
    'use strict';
    var api = {};
    api.grantors = {
      Facebook: 0,
      Google: 1
    };

    api.getToken = function (grantor) {
      var deferred = $q.defer();

      if (grantor === api.grantors.Facebook) {
        //second param forces FB actually check status, not use cached response
        FB.getLoginStatus(function (res) {
          if (res.status === 'connected') {
            deferred.resolve(res.authResponse.accessToken);
          } else {
            FB.login(function (res) {
              if (res.status === 'connected') {
                deferred.resolve(res.authResponse.accessToken);
              } else {
                deferred.reject('Facebook did not connect');
              }
            }, {scope: 'email', return_scopes: true});
          }
        }, true);
      }

      return deferred.promise;
    };

    api.callURL = function (params) {
      return $http.post(params.url, params).then(function (res) {
        khAccountToken.setToken(res.data.token);
      });
    };

    return api;
  })
;