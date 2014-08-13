'use strict';

var _ = require('lodash');
var paramType = require('./paramType');

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
  _.forEach(spec.parameters, function(param) {
    var paramReturn = paramType(param, req, models);
    if (_.some(paramReturn, function(val) { return val.hasOwnProperty('error'); })) {
      ret = ret.concat(paramReturn);
    }
  });
  return ret;
};
module.exports = exports = validate;