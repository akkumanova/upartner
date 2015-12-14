/*global angular*/
(function (angular) {
  'use strict';
  angular.module('main').config(['l10nProvider', function (l10n) {
    l10n.add('en', {
      //navigation
      navigation_partners: 'Partners',

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
      partners_new_cancel: 'Cancel'
    });
  }]);
}(angular));
