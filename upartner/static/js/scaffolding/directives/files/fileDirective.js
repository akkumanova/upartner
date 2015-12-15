/*global angular, window*/
(function (angular, window) {
  'use strict';

  angular.module('scaffolding')
    .constant('scFileConfig', {
      uploadUrl: 'api/files/'
    })
    .directive('scFile', ['$injector', '$q', function ($injector, $q) {
      return {
        priority: 110,
        restrict: 'E',
        controller: 'FileCtrl',
        require: ['scFile', '?ngModel'],
        replace: true,
        scope: {
          urlParams: '&'
        },
        templateUrl: 'static/js/scaffolding/directives/files/fileDirective.html',
        link: function link(scope, iElement, iAttrs, controllers) {
          var fileCtrl = controllers[0],
              ngModelCtrl = controllers[1];

          iAttrs.$observe('readonly', function (value) {
            scope.isReadonly = value === true;
          });

          fileCtrl.setNgModelCtrl(ngModelCtrl, scope);
        }
      };
    }]);
}(angular, window));