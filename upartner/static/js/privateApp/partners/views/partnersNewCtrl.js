/*global angular*/
(function (angular) {
  'use strict';

  function PartnersNewCtrl(
    $scope,
    $state,
    $http,
    csrfToken
  ) {
    $scope.save = function () {
      return $scope.newPartner.$validate().then(function () {
        if ($scope.newPartner.$valid) {
          $http({
            method: 'POST',
            url: 'api/partners/',
            headers: {
             'X-CSRFToken': csrfToken.get()
            },
            data: $scope.partner
          }).then(function (result) {
            return $state.go('root.partners.edit', {
              id:  result.data.id
            });
          });
        }
      });
    };

    $scope.cancel = function () {
      return $state.go('root.partners.search');
    };
  }

  PartnersNewCtrl.$inject = [
    '$scope',
    '$state',
    '$http',
    'csrfToken'
  ];

  angular.module('main').controller('PartnersNewCtrl', PartnersNewCtrl);
}(angular));