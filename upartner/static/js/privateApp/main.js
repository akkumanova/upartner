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
  ]).config(['scaffoldingProvider', function (scaffoldingProvider) {
  }]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state(['root'                , null        , ['@'    , 'static/js/privateApp/root/views/root.html'              , 'RootCtrl'          ]])
        .state(['root.partners'       , '/partners?firstName&lastName'                                                                          ])
        .state(['root.partners.search', ''          , ['@root', 'static/js/privateApp/partners/views/partnersSearch.html', 'PartnersSearchCtrl']])
        .state(['root.partners.edit'  , '/:id'      , ['@root', 'static/js/privateApp/partners/views/partnersEdit.html'  , 'PartnersEditCtrl'  ]])
        .state(['root.partners.new'   , '/new'      , ['@root', 'static/js/privateApp/partners/views/partnersNew.html'   , 'PartnersNewCtrl'  ]]);
  }]);
}(angular));
