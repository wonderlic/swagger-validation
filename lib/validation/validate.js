'use strict';

var _ = require('lodash');
var paramType = require('./paramType');

/**
 * Ensures that that the validation object on the <tt>spec</tt> is complete with all defaults configured.
 *
 * @memberOf Validation.ParamTypes
 * @method Make_Validation_Object
 * @param {Object} [validation] Optionally, the validation object that is defined as part of this Swagger API definition
 * @returns {Object} An object that contains the values passed in on <tt>spec.validation</tt>,
 * plus any defaults for missing values
 */
var makeValidationObject = function(validation) {
  validation = validation || {};
  return {
    enabled: validation.hasOwnProperty('enabled') ? validation.enabled : true,
    replaceValues: validation.hasOwnProperty('replaceValues') ? validation.replaceValues : true
  };
};

/**
 * Validates the <tt>req</tt> against the <tt>spec</tt> that was defined.
 * @memberOf Validation
 * @method Validate
 * @param {Object} spec The specification that this is validating
 * @param {Object} req The request that this is validating. Any date/date-time values specified in the spec
 * will be automatically converted to Date objects if they pass validation.
 * @param {Object} [models] Optionally, the models that are defined as part of this Swagger API definition
 * @returns {Array} An empty array if there were no validation errors or an array of objects with error properties
 * if there are one or more validation errors.
 */
var validate = function(spec, req, models) {
  var ret = [];
  var validationObj = makeValidationObject(spec.validation);
  if (validationObj.enabled) {
    _.forEach(spec.parameters, function(param) {
      var paramReturn = paramType(param, req, models, validationObj);
      if (_.some(paramReturn, function(val) { return val.hasOwnProperty('error'); })) {
        ret = ret.concat(paramReturn);
      }
    });
  }
  return ret;
};
module.exports = exports = validate;