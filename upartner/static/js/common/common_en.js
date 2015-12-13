/*global angular*/
(function (angular) {
  'use strict';
  angular.module('common').config(['l10nProvider', function (l10n) {
    l10n.add('en', {
      //forms_partnerData
      forms_partnerData_username: 'Username',
      forms_partnerData_checkResult: 'Check result',
      forms_partnerData_firstName: 'First name',
      forms_partnerData_lastName: 'Last name',
      forms_partnerData_email: 'Email',
      forms_partnerData_country: 'Country'
    });
  }]);
}(angular));
