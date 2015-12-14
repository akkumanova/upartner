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
      forms_partnerData_country: 'Country',

      //modals_changePasswordModal
      modals_changePasswordModal_title: 'Change password',
      modals_changePasswordModal_oldPassword: 'Current password',
      modals_changePasswordModal_newPassword: 'New password',
      modals_changePasswordModal_confirmNewPassword: 'Confirm new password',
      modals_changePasswordModal_noPasswordMatch: 'Passwords don\'t match' ,
      modals_changePasswordModal_passMustBeMin8symbols: 'Password must contain at least 8 characters',
      modals_changePasswordModal_wrongPassword: 'Wrong password',
      modals_changePasswordModal_save: 'Save',
      modals_changePasswordModal_cancel: 'Cancel'
    });
  }]);
}(angular));
