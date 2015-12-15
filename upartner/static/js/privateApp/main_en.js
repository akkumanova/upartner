/*global angular*/
(function (angular) {
  'use strict';
  angular.module('main').config(['l10nProvider', function (l10n) {
    l10n.add('en', {
      //navigation
      navigation_partners: 'Partners',
      navigation_partners_checkFiles: 'Check files',
      navigation_partners_exportPartners: 'Export partners',

      //common_navigation
      navigation_logout: 'Exit',
      navigation_changePassword: 'Change password',

      //partners_search
      partners_search_search: 'Search',
      partners_search_new: 'New partner',
      partners_search_username: 'Username',
      partners_search_firstName: 'First name',
      partners_search_lastName: 'Last name',
      partners_search_email: 'Email',
      partners_search_country: 'Country',
      partners_search_isActive: 'Is active',
      partners_search_checkResult: 'Check result',

      //partners_edit
      partners_edit_title: 'Edit partner',
      partners_edit_activate: 'Activate',
      partners_edit_edit: 'Edit',
      partners_edit_save: 'Save',
      partners_edit_cancel: 'Cancel',
      partners_edit_deactivate: 'Deactivate',

      //partners_new
      partners_new_title: 'New partner',
      partners_new_save: 'Save',
      partners_new_cancel: 'Cancel',

      //checkFiles_search
      checkFiles_search_new: 'New file',
      checkFiles_search_dateCreated: 'Date created',
      checkFiles_search_isImported: 'Is imported',
      checkFiles_search_dateImported: 'Date imported',

      //checkFiles_new
      checkFiles_new_title: 'New file',
      checkFiles_new_save: 'Save',
      checkFiles_new_cancel: 'Cancel',
      checkFiles_new_file: 'File',

      //modals_choosePartners
      modals_choosePartners_title: 'Choose partners to export',
      modals_choosePartners_continue: 'Continue',
      modals_choosePartners_cancel: 'Cancel',
      modals_choosePartners_country: 'Country',
      modals_choosePartners_search: 'Search',
      modals_choosePartners_username: 'Username',
      modals_choosePartners_firstName: 'First name',
      modals_choosePartners_lastName: 'Last name',
      modals_choosePartners_email: 'Email',
      modals_choosePartners_isActive: 'Is active'
    });
  }]);
}(angular));
