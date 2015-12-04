/*global angular*/

angular.module('bioshock')
  .config(function ($routeProvider, $httpProvider) {
    'use strict';
    //ensures all http requests have auth headers, ties into service
    $httpProvider.interceptors.push('khAccountTokenInterceptor');

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'bioshockLoginController',
        access: {
          requiresLogin: false
        }
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'bioshockMainController',
        access: {
          requiresLogin: true
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function ($rootScope, $location, khAccountAccount) {
    'use strict';

    //on refresh / new route, check if user is already logged in and forward to main if so
    $rootScope.$on('$routeChangeStart', function () {
      khAccountAccount.checkToken().then(
        function () {
          $location.path('/main');
        },
        function () {
          $location.path('/login');
        }
      );
    });
  })
;