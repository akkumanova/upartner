/*global angular, _*/
(function (angular, _) {
  'use strict';

  function PartnersSearchCtrl(
    $scope,
    $state,
    $stateParams,
    partners
  ) {
    $scope.filters = {
      firstName: null,
      lastName: null
    };

    _.forOwn($stateParams, function (value, param) {
      if (value !== null && value !== undefined) {
        $scope.filters[param] = value;
      }
    });

    $scope.partners = partners;

    $scope.search = function () {
      return $state.go('root.partners.search', $scope.filters);
    };
  }

  PartnersSearchCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'partners'
  ];

  PartnersSearchCtrl.$resolve = {
    partners: [
      'Partner',
      '$stateParams',
      function (Partner, $stateParams) {
        return Partner.query($stateParams).$promise;
      }
    ]
  };

  angular.module('main').controller('PartnersSearchCtrl', PartnersSearchCtrl);
}(angular, _));
/**
 * Created by albs on 13-Dec-15.
 */
