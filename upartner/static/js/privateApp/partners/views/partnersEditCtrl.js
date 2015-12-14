/*global angular*/
(function (angular) {
  'use strict';

  function PartnersEditCtrl(
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
            url: 'api/partners/' + $stateParams.id + '/',
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
      return $http({
        method: 'POST',
        url: 'api/partners/' + $stateParams.id + '/activate/',
        headers: {
         'X-CSRFToken': csrfToken.get()
        },
        data: {}
      }).then(function () {
        return $state.go($state.current, {
          id:  $stateParams.id
        }, {
          reload: true
        });
      });
    };

    $scope.deactivate = function () {
      return $http({
        method: 'POST',
        url: 'api/partners/' + $stateParams.id + '/deactivate/',
        headers: {
         'X-CSRFToken': csrfToken.get()
        },
        data: {}
      }).then(function () {
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