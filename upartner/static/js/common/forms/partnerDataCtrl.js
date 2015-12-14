/*global angular*/
(function (angular) {
  'use strict';

  function PartnerDataCtrl($scope, scFormParams) {
    $scope.isNew = scFormParams.isNew;
  }

  PartnerDataCtrl.$inject = ['$scope', 'scFormParams'];

  angular.module('common').controller('PartnerDataCtrl', PartnerDataCtrl);
}(angular));