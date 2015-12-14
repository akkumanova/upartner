/*global angular, _, window*/
(function (angular, _, window) {
  'use strict';

  function ChoosePartnersModalCtrl(
    $scope,
    $modalInstance,
    $http,
    Partner,
    partners
  ) {
    $scope.form = {};
    $scope.chosenPartnerIds = [];
    $scope.partners = partners;
    $scope.tableControl = {};

    $scope.filters = {
      countryId: null
    };

    $scope.search = function () {
      return Partner.getPartnersForExport({
        countryId: $scope.filters.countryId
      }).$promise.then(function (filteredPartners) {
        $scope.chosenPartnerIds = _.intersection(
          $scope.chosenPartnerIds,
          _.pluck(filteredPartners, 'id'));

        _.map(filteredPartners, function (partner) {
          if (_.contains($scope.chosenPartnerIds, partner.id)) {
            partner.isChosen = true;
          }

          return partner;
        });

        $scope.partners = filteredPartners;
      });
    };

    $scope.choosePartner = function (partner) {
      partner.isChosen = true;
      $scope.chosenPartnerIds.push(partner.id);
    };

    $scope.removePartner = function (partner) {
      partner.isChosen = false;
      $scope.chosenPartnerIds = _.without($scope.chosenPartnerIds, partner.id);
    };

    $scope.ok = function () {
      var queryStr = _.map($scope.chosenPartnerIds, function (id) {
            return 'ids=' + id;
          }).join('&');

      var link = window.document.createElement("a");
      //link.download = "data:text/html";
      link.href = 'api/partnerInterfaces/export?' + queryStr;
      link.click();

      return $modalInstance.close();
    };

    $scope.cancel = function () {
      return $modalInstance.dismiss('cancel');
    };
  }

  ChoosePartnersModalCtrl.$inject = [
    '$scope',
    '$modalInstance',
    '$http',
    'Partner',
    'partners'
  ];

  ChoosePartnersModalCtrl.$resolve = {
    partners: [
      'Partner',
      function (Partner) {
        return Partner.getPartnersForExport().$promise;
      }
    ]
  };

  angular.module('main').controller('ChoosePartnersModalCtrl', ChoosePartnersModalCtrl);
}(angular, _, window));
