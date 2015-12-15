/*global angular*/
(function (angular) {
  'use strict';

  function CheckFilesNewCtrl(
    $scope,
    $state,
    $http,
    csrfToken
  ) {
    $scope.save = function () {
      return $scope.newCheckFile.$validate().then(function () {
        if ($scope.newCheckFile.$valid) {
          $http({
            method: 'POST',
            url: 'api/checkFiles/',
            headers: {
             'X-CSRFToken': csrfToken.get()
            },
            data: $scope.file
          }).then(function () {
            return $state.go('root.checkFiles.search');
          });
        }
      });
    };

    $scope.cancel = function () {
      return $state.go('root.checkFiles.search');
    };
  }

  CheckFilesNewCtrl.$inject = [
    '$scope',
    '$state',
    '$http',
    'csrfToken'
  ];

  angular.module('main').controller('CheckFilesNewCtrl', CheckFilesNewCtrl);
}(angular));