/*global angular*/
(function (angular) {
  'use strict';

  angular.module('main').factory('CheckFile', ['$resource', function ($resource) {
    return $resource('api/checkFiles/:id/', {}, {
      getItems: {
        method: 'GET',
        url: 'api/checkFiles/:id/items',
        isArray: true
      }
    });
  }]);
}(angular));