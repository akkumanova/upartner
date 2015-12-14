/*global angular*/
(function (angular) {
  'use strict';

  angular.module('main').factory('Partner', ['$resource', function ($resource) {
    return $resource('api/partners/:id/');
  }]);
}(angular));