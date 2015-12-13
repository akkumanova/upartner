/*global angular*/
(function (angular) {
  'use strict';

  function PartnersEditCtrl(
    $scope,
    $state,
    $stateParams,
    $http,
    csrfToken,
    Partner,
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
            url: 'api/partners/' + $stateParams.id,
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

    $scope.activate = function () {
      return Partner.activate({
        id: $stateParams.id
      }, $scope.partner).$promise.then(function () {
        return $state.go($state.current, {
          id:  $stateParams.id
        }, {
          reload: true
        });
      });
    };

    $scope.deactivate = function () {
      return Partner.deactivate({
        id: $stateParams.id
      }, $scope.partner).$promise.then(function () {
        return $state.go($state.current, {
          id:  $stateParams.id
        }, {
          reload: true
        });
      });
    };
  }

  PartnersEditCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$http',
    'csrfToken',
    'Partner',
    'partner'
  ];

  PartnersEditCtrl.$resolve = {
    partner: [
      'Partner',
      '$stateParams',
      function (Partner, $stateParams) {
        return Partner.get({
          id: $stateParams.id
        }).$promise;
      }
    ]
  };

  angular.module('main').controller('PartnersEditCtrl', PartnersEditCtrl);
}(angular));