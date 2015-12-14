/*global angular*/
(function (angular) {
  'use strict';
  angular.module('common', [
    'ng',
    'ui.bootstrap',
    'scaffolding',
    'l10n'
  ]).config(['scModalProvider', function (scModalProvider) {
    scModalProvider
     .modal('changePassword', 'static/js/common/modals/changePasswordModal.html', 'ChangePasswordModalCtrl', 'xsm');
  }]).config(['scaffoldingProvider', function (scaffoldingProvider) {
    scaffoldingProvider.form({
      name: 'ubPartnerData',
      templateUrl: 'static/js/common/forms/partnerData.html',
      controller: 'PartnerDataCtrl'
    });
  }]);
}(angular));