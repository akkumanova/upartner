/*global angular, _*/
(function (angular, _) {
  'use strict';
  angular.module('privateApp', [
    'ng',
    'ui.router',
    'l10n',
    'boot',
    'common',
    'main'
  ]).config([
    '$urlRouterProvider',
    '$locationProvider',
    function (
      $urlRouterProvider,
      $locationProvider
    ) {
      $locationProvider.html5Mode(false);
      $urlRouterProvider.otherwise('/partners');
    }
  ]).config(['l10nProvider', function(l10n) {
    l10n.setLocale('en');

    l10n.setExtension('js');
  }]).config(['$provide', function ($provide) {
    $provide.decorator('$exceptionHandler', [
      '$delegate',
      '$injector',
      function ($delegate, $injector) {
        var $rootScope,
            l10n;
        return function (exception, cause) {
          if (exception && exception.handled) {
            return;
          }

          $delegate(exception, cause);

          try {
            $rootScope = $rootScope || $injector.get('$rootScope');
            l10n = l10n || $injector.get('l10n');
            $rootScope.$broadcast('alert', cause || l10n.trans('app_unknownErrorMessage'), 'danger');
          } catch (e) {
            //swallow all exception so that we don't end up in an infinite loop
          }
        };
      }
    ]);
  }]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      '$rootScope',
      function($q, $rootScope) {
        return {
          specificallyHandled: function(specificallyHandledBlock) {
            var specificallyHandleInProgress = true;
            try {
              return specificallyHandledBlock();
            } finally {
              specificallyHandleInProgress = false;
            }
          },
          responseError: function(rejection) {
            var shouldHandle = (rejection && rejection.config && rejection.config.headers &&
            (rejection.statusText || rejection.status == 500));

            if (shouldHandle) {
              try {
                var message;
                if (rejection.status == 500) {
                  message = 'An error has occurred! Please refresh the page with F5 and try again.';
                } else {
                  message = rejection.statusText;
                }

                $rootScope.$broadcast('alert', message, 'danger');
              } catch (e) {
                //swallow all exception so that we don't end up in an infinite loop
              }
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);

    $httpProvider.defaults.headers.get = {
      'cache-control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0'
    };
  }]).factory('csrfToken', function () {
    return {
      get: function () {
        var match = /(^|;\s?)csrftoken=(.+?)($|;)/.exec(window.document.cookie),
            csrfToken = match && match[2];

        return csrfToken;
      }
    };
  });
}(angular, _));
