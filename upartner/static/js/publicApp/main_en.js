/*global angular*/
(function (angular) {
  'use strict';
  angular.module('main').config(['l10nProvider', function (l10n) {
    l10n.add('en', {
      //navigation
      navigation_partnerData: 'Account',

      //common_navigation
      navigation_logout: 'Exit',
      navigation_changePassword: 'Change password',

      //account_edit
      account_edit_title: 'Edit account data',
      account_edit_edit: 'Edit',
      account_edit_save: 'Save',
      account_edit_cancel: 'Cancel'
    });
  }]);
}(angular));
