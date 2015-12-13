// Usage:
//<sc-validation-error field-name="fieldName" validations="{val1:'l10n', val2: 'default', ...}">
//</sc-validation-error>

/*global angular,_*/
(function (angular, _) {
  'use strict';

  function ValidationErrorDirective($parse, l10n, scValidationErrorConfig) {

    return {
      restrict: 'E',
      scope: {
        getValidations: '&validations'
      },
      templateUrl: 'static/js/scaffolding/directives/validationError/validationErrorDirective.html',
      link: function (scope, element, attrs) {
        scope.form = element.parent().controller('form');
        scope.fieldName = $parse(attrs.fieldName)(scope.$parent) || attrs.fieldName;
        scope.validations = [];
        _.forOwn(scope.getValidations(), function (text, type) {
          scope.validations.push({
            type: type,
            text: l10n.trans(text !== 'default' ?
              text :
              scValidationErrorConfig.defaultErrorTexts[type])
          });
        });
      }
    };
  }

  ValidationErrorDirective.$inject = ['$parse', 'l10n', 'scValidationErrorConfig'];

  angular.module('scaffolding')
    .constant('scValidationErrorConfig', {
      defaultErrorTexts: {
        required: 'defaultErrorTexts_required',
        pattern: 'defaultErrorTexts_pattern',
        minlength: 'defaultErrorTexts_minlength',
        maxlength: 'defaultErrorTexts_maxlength',
        min: 'defaultErrorTexts_min',
        max: 'defaultErrorTexts_max',
        unique: 'defaultErrorTexts_unique'
      }
    })
    .directive('scValidationError', ValidationErrorDirective);
}(angular, _));
