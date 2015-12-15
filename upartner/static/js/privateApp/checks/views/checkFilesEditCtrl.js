/*global angular*/
(function (angular) {
  'use strict';

  function CheckFilesEditCtrl(
    $scope,
    $state,
    $stateParams,
    $http,
    csrfToken,
    checkFile,
    items
  ) {
    $scope.checkFile = checkFile;
    $scope.items = items;

    $scope.import = function () {
      return $http({
        method: 'POST',
        url: 'api/checkFiles/' + $stateParams.id + '/importdata/',
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

    $scope.del = function () {
      return $http({
        method: 'DELETE',
        url: 'api/checkFiles/' + $stateParams.id + '/',
        headers: {
         'X-CSRFToken': csrfToken.get()
        },
        data: {}
      }).then(function () {
        return $state.go('root.checkFiles.search',{}, {reload: true});
      });
    };
  }

  CheckFilesEditCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$http',
    'csrfToken',
    'checkFile',
    'items'
  ];

  CheckFilesEditCtrl.$resolve = {
    checkFile: [
      'CheckFile',
      '$stateParams',
      function (CheckFile, $stateParams) {
        return CheckFile.get({
          id: $stateParams.id
        }).$promise;
      }
    ],
    items: [
      'CheckFile',
      '$stateParams',
      function (CheckFile, $stateParams) {
        return CheckFile.getItems({
          id: $stateParams.id
        }).$promise;
      }
    ]
  };

  angular.module('main').controller(
      'CheckFilesEditCtrl',
      CheckFilesEditCtrl);
}(angular));