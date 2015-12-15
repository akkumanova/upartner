/*global angular*/
(function (angular) {
  'use strict';

  angular.module('main').factory('CheckFile', ['$resource', function ($resource) {
    return $resource('api/checkFiles/:id/');
  }]);
}(angular));