/*global angular*/
(function (angular) {
  'use strict';

  angular.module('main').factory('Partner', ['$resource', function ($resource) {
    return $resource('api/partners/:id/', {}, {
      getPartnersForExport: {
        method: 'GET',
        url: 'api/partners/forexport',
        isArray: true
      }
    });
  }]);
}(angular));