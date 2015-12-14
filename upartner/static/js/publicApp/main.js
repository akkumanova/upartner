/*global angular*/
(function (angular) {
  'use strict';
  angular.module('main', [
    'ng',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'scaffolding',
    'l10n'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state(['root'                , null   , ['@'    , 'static/js/publicApp/root/views/root.html'          , 'RootCtrl'        ]])
        .state(['root.data'           , '/data', ['@root', 'static/js/publicApp/account/views/accountEdit.html', 'AccountEditCtrl']]);
  }]);
}(angular));
