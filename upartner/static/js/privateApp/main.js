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
  ]).config(['scModalProvider', function (scModalProvider) {
    scModalProvider
     .modal('choosePartnersModal', 'static/js/privateApp/partners/modals/choosePartnersModal.html', 'ChoosePartnersModalCtrl', 'xlg');
  }]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state(['root'                  , null        , ['@'    , 'static/js/privateApp/root/views/root.html'              , 'RootCtrl'             ]])
        .state(['root.partners'         , '/partners?firstName&lastName'                                                                             ])
        .state(['root.partners.search'  , ''          , ['@root', 'static/js/privateApp/partners/views/partnersSearch.html', 'PartnersSearchCtrl'   ]])
        .state(['root.partners.new'     , '/new'      , ['@root', 'static/js/privateApp/partners/views/partnersNew.html'    , 'PartnersNewCtrl'     ]])
        .state(['root.partners.edit'    , '/:id'      , ['@root', 'static/js/privateApp/partners/views/partnersEdit.html'  , 'PartnersEditCtrl'     ]])
        .state(['root.checkFiles'       , '/checkFiles'                                                                                              ])
        .state(['root.checkFiles.search', ''          , ['@root', 'static/js/privateApp/checks/views/checkFilesSearch.html' , 'CheckFilesSearchCtrl']])
        .state(['root.checkFiles.new'   , '/new'      , ['@root', 'static/js/privateApp/checks/views/checkFilesNew.html'    , 'CheckFilesNewCtrl'   ]])
        .state(['root.checkFiles.edit'  , '/:id'      , ['@root', 'static/js/privateApp/checks/views/checkFilesEdit.html'   , 'CheckFilesEditCtrl'  ]]);
  }]);
}(angular));
