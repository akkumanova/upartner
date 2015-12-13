// Usage:
//<sc-navigation user-fullname="" change-password-state="">
//</sc-navigation>

/*global angular*/
(function (angular) {
  'use strict';

  function NavigationDirective($window, scModal) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'static/js/scaffolding/directives/navigation/navigationDirective.html',
      scope: {
        userFullname: '@'
      },
      controller: ['$scope', function NavigationCtrl($scope) {
        $scope.logout = function logout() {
        };

        $scope.changePassword = function changePassword() {
          var modalInstance = scModal.open('changePassword');

          return modalInstance.opened;
        };
      }]
    };
  }
  NavigationDirective.$inject = ['$window', 'scModal'];
  angular.module('scaffolding').directive('scNavigation', NavigationDirective);
}(angular));
