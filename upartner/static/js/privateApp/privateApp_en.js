/*global angular*/
(function (angular) {
  'use strict';
  angular.module('privateApp').config(['l10nProvider', function (l10n) {
    l10n.add('en', {
      app_unknownErrorMessage: 'An error has occurred! Please refresh the page with F5 and try again.'
    });
  }]);
}(angular));
