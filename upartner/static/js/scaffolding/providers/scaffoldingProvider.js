﻿/*global angular, _*/
(function (angular, _) {
  'use strict';

  function ScaffoldingProvider($compileProvider) {
    this.form = function (options) {
      $compileProvider.directive(options.name, ['$parse', '$controller', function ($parse, $controller) {
        return {
          restrict: 'E',
          replace: true,
          scope: {
            model: '=ngModel'
          },
          templateUrl: options.templateUrl,
          link: {
            pre: function (scope, element, attrs) {
              var scFormParams,
                  eventHandlers = {},
                  locals;

              if (options.controller) {
                scFormParams = $parse(attrs.scFormParams)(scope.$parent);
                locals = {
                  $scope: scope,
                  $element: element,
                  $attrs: attrs,
                  scFormParams: scFormParams ? scFormParams : {}
                };

                $controller(options.controller, locals);
              }

              scope.$raise = function (eventName, message) {
                if (eventHandlers[eventName]) {
                  return eventHandlers[eventName](message);
                }
              };

              _.forOwn(attrs, function (value, key) {
                var parsedFunc,
                    dataKey;
              
                // event handler
                if (key.indexOf('scOn') === 0) {
                  parsedFunc = $parse(value);

                  eventHandlers[key] = function (message) {
                    return parsedFunc(scope.$parent, { $message: message });
                  };
                }

                // data attribute
                if (key.indexOf('scData') === 0) {
                  dataKey = key.substring('scData'.length);
                  dataKey = dataKey[0].toLowerCase() + dataKey.substring(1);
                  scope[dataKey] = $parse(value)(scope.$parent);

                  scope.$parent.$watch(value, function (newValue) {
                    scope[dataKey] = newValue;
                  });
                }
              });
            },
            post: function (scope, element, attrs) {
              if (attrs.readonly) {
                scope.$parent.$watch(attrs.readonly, function (readonly) {
                  scope.readonly = readonly;
                });
              }

              scope.$parent[attrs.name] = scope[attrs.name];
              scope.form = scope[attrs.name];
            }
          }
        };
      }]);
    };
  }

  ScaffoldingProvider.$inject = ['$compileProvider'];

  ScaffoldingProvider.prototype.$get = function () {
  };

  angular.module('scaffolding').provider('scaffolding', ScaffoldingProvider);
}(angular, _));
