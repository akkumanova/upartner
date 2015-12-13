/*global angular*/
(function (angular) {
  'use strict';
  angular.module('scaffolding').config(['l10nProvider', function (l10n) {
    l10n.add('en', {
      //navigation
      navigation_logout: 'Exit',
      navigation_changePassword: 'Change password',

      //datatable
      datatable_firstPage: 'First page',
      datatable_lastPage: 'Last page',
      datatable_nextPage: 'Next',
      datatable_previousPage: 'Prev',
      datatable_info: 'Found {{total}} results (from {{start}} to {{end}})',
      datatable_datatableInfo: 'Results showed from ',
      datatable_to: ' to ',
      datatable_all: ' from totla ',
      datatable_noDataAvailable: 'No results found',
      datatable_displayRecords: ' page',
      datatable_search: 'Search',
      datatable_filtered: ' (filtered from {{max}} records)',
      datatable_deleteColumns: 'Columns',
      datatable_yes: 'Yes',
      datatable_no: 'No'
    });
  }]);
}(angular));
