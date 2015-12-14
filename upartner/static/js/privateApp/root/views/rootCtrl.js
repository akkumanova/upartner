/*global angular*/
(function (angular) {
  'use strict';

  function RootCtrl($scope, $timeout, $http, $sce) {
    $http({
      method: 'GET',
      url: 'api/users/current'
    }).then(function (result) {
      $scope.userFullname = result.data.firstName + ' ' +
       result.data.lastName;
    });

    $scope.alerts = [];
    $scope.removeAlert = function (alert) {
      var index = $scope.alerts.indexOf(alert);
      //check if it has already been removed by the user or a timeout
      if (index >= 0) {
        $scope.alerts.splice(index, 1);
      }
    };

    $scope.$on('alert', function (event, msg, type) {
      try {
        var alert = { message: $sce.trustAsHtml(msg), type: type };
        $scope.alerts.push(alert);

        //remove the alert after 60 seconds
        $timeout(function () {
          $scope.removeAlert(alert);
        }, 60 * 1000);
      } catch (e) {
        //swallow all exception so that we don't end up in an infinite loop
      }
    });
  }

  RootCtrl.$inject = ['$scope', '$timeout', '$http', '$sce'];

  RootCtrl.$resolve = {};

  angular.module('main').controller('RootCtrl', RootCtrl);
}(angular));
