/*global angular*/
(function (angular) {
  'use strict';

  function ChangePasswordModalCtrl(
    $scope,
    $modalInstance,
    $http,
    csrfToken
  ) {
    $scope.form = {};
    $scope.passwords = {};

    $scope.save = function () {
      return $scope.form.changePasswordForm.$validate().then(function () {
        if ($scope.form.changePasswordForm.$valid) {
          return $http({
            method: 'POST',
            url: 'api/users/changepassword/',
            headers: {
             'X-CSRFToken': csrfToken.get()
            },
            data: $scope.passwords
          }).then(function () {
            return $modalInstance.close();
          });
        }
      });
    };

    $scope.cancel = function () {
      return $modalInstance.dismiss('cancel');
    };

    $scope.matchPasswords = function (confirmNewPassword) {
      if (!$scope.passwords.newPassword) {
        return true;
      }
      return $scope.passwords.newPassword === confirmNewPassword;
    };

    $scope.checkPassword = function (password) {
      if (!password) {
        return true;
      }

      return $http({
        method: 'POST',
        url: 'api/users/checkpassword/',
        headers: {
         'X-CSRFToken': csrfToken.get()
        },
        data: {
          password: password
        }
      }).then(function (result) {
        return result.data.valid;
      });
    };
  }

  ChangePasswordModalCtrl.$inject = [
    '$scope',
    '$modalInstance',
    '$http',
    'csrfToken'
  ];

  angular.module('common').controller('ChangePasswordModalCtrl', ChangePasswordModalCtrl);
}(angular));