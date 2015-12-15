/*global angular, window, _*/
(function (angular, window, _) {
  'use strict';

  function FileCtrl($q, $exceptionHandler, $scope, l10n, $timeout, csrfToken, scFileConfig) {
    $scope.upload = undefined;
    $scope.uploadUrl = scFileConfig.uploadUrl;
    $scope.headers = {
      'X-CSRFToken': csrfToken.get()
    };

    $scope.setFile = function(file) {
      var url;
      if (file) {
        if (!_.has(file, 'url')) {
          url = scFileConfig.uploadUrl + file.key
        } else {
          url = file.url;
        }

        $scope.file = {
          name: file.name,
          url: url
        };
      } else {
        $scope.file = undefined;
      }
    };

    $scope.add = function (e, fileData) {
      if ($scope.isReadonly) {
        return;
      }

      var jqXHR = fileData.submit(),
          deferred = $q.defer();

      $scope.$apply(function () {
        $scope.upload = jqXHR;
        $scope.percent = 0;
      });

      jqXHR.then(function(data) {
        deferred.resolve(data);
      }, function(jqXHR, textStatus, errorThrown) {
        deferred.reject(errorThrown);
      });

      deferred.promise.then(function (data) {
        if (data.fileKey) {
          var file = {
            name: fileData.files[0].name,
            key: data.fileKey
          };

          $scope.setViewValue(file);
          $scope.setFile(file);
        }
      })['catch'](function (error) {
        if (error !== 'abort') {
          $exceptionHandler(error, l10n.trans('file_failAlert'));
        }
      })['finally'](function () {
        $scope.upload = undefined;
      });
    };

    $scope.remove = function () {
      if (!$scope.isReadonly) {
        if ($scope.upload) {
          $scope.upload.abort();
        } else {
          $scope.setViewValue(undefined);
          $scope.setFile(undefined);
        }
      }
    };

    $scope.progress = function (e, data) {
      if (!$scope.upload || $scope.upload.readyState === 4) {//DONE
        return;
      }

      var progress = data.progress();
      if (progress && progress.total) {
        //we force our handler to always run asynchronously by using the $timeout service and
        //by providing a timeout period of 0ms, this will occur as soon as possible and
        //$timeout will ensure that the code will be called in a single $apply block
        $timeout(function () {
          $scope.percent = Math.floor(100 * (progress.loaded / progress.total));
        }, 0);
      }
    };
  }

  FileCtrl.prototype.setNgModelCtrl = function (ngModel, $scope) {
    $scope.setViewValue = function (value) {
      ngModel.$setViewValue(value);
    };

    ngModel.$render = function () {
      $scope.setFile(ngModel.$viewValue);
    };

    $scope.isInvalid = function () {
      return ngModel.$invalid;
    };
  };

  FileCtrl.$inject = [
    '$q',
    '$exceptionHandler',
    '$scope',
    'l10n',
    '$timeout',
    'csrfToken',
    'scFileConfig'
  ];

  angular.module('scaffolding').controller('FileCtrl', FileCtrl);
}(angular, window, _));