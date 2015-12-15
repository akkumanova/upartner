/*global angular*/
(function (angular) {
  'use strict';

  function PartnerDataCtrl($scope, $http, scFormParams) {
    $scope.isNew = scFormParams.isNew;

    $scope.usernameUnique = function () {
      if (!$scope.model || !$scope.model.username) {
        return true;
      }

      return $http({
        method: 'GET',
        url: 'api/users/username_unique/',
        params: {
          username: $scope.model.username,
          uid: $scope.model.id
        }
      }).then(function (result) {
        return result.data.valid;
      });
    }
  }

  PartnerDataCtrl.$inject = ['$scope', '$http', 'scFormParams'];

  angular.module('common').controller('PartnerDataCtrl', PartnerDataCtrl);
}(angular));