/*global angular*/
(function (angular) {
  'use strict';
  angular.module('common', [
    'ng',
    'ui.bootstrap',
    'scaffolding',
    'l10n'
  ]).config(['scaffoldingProvider', function (scaffoldingProvider) {
    scaffoldingProvider.form({
      name: 'ubPartnerData',
      templateUrl: 'static/js/common/forms/partnerData.html',
      controller: 'PartnerDataCtrl'
    });
  }]);
}(angular));