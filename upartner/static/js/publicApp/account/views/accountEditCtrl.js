/*global angular*/
(function (angular) {
  'use strict';

  function AccountEditCtrl(
    $scope,
    $state,
    $stateParams,
    $http,
    csrfToken,
    partner
  ) {
    $scope.editMode = null;
    $scope.partner = partner;

    $scope.edit = function () {
      $scope.editMode = 'edit';
    };

    $scope.save = function () {
      return $scope.editPartners.$validate().then(function () {
        if ($scope.editPartners.$valid) {
          $http({
            method: 'PUT',
            url: 'api/partnerAccounts/updatedata/',
            headers: {
             'X-CSRFToken': csrfToken.get()
            },
            data: $scope.partner
          }).then(function () {
            return $state.go($state.current, {
              id:  $stateParams.id
            }, {
              reload: true
            });
          });
        }
      });
    };

    $scope.cancel = function () {
      return $state.go($state.current, {
        id:  $stateParams.id
      }, {
        reload: true
      });
    };
  }

  AccountEditCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$http',
    'csrfToken',
    'partner'
  ];

  AccountEditCtrl.$resolve = {
    partner: [
      '$http',
      function ($http) {
        return $http({
          method: 'GET',
          url: 'api/partnerAccounts/data'
        }).then(function (result) {
          return result.data;
        });
      }
    ]
  };

  angular.module('main').controller('AccountEditCtrl', AccountEditCtrl);
}(angular));