/**
 * Created by albs on 13-Dec-15.
 */
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
            $rootScope.$broadcast('alert', cause || l10n.trans('app.unknownErrorMessage'), 'danger');
          } catch (e) {
            //swallow all exception so that we don't end up in an infinite loop
          }
        };
      }
    ]);
  }]).config(['$httpProvider', function ($httpProvider) {
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
