/*global angular, _*/
(function (angular, _) {
  'use strict';

  function CheckFilesSearchCtrl($scope, checkFiles) {
    $scope.checkFiles = checkFiles;
  }

  CheckFilesSearchCtrl.$inject = [
    '$scope',
    'checkFiles'
  ];

  CheckFilesSearchCtrl.$resolve = {
    checkFiles: [
      'CheckFile',
      function (CheckFile) {
        return CheckFile.query().$promise;
      }
    ]
  };

  angular.module('main').controller('CheckFilesSearchCtrl', CheckFilesSearchCtrl);
}(angular, _));
