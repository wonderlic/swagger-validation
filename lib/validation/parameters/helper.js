'use strict';

var _ = require('lodash');
var util = require('util');

module.exports = exports = {};

/**
 * Used by the {@link Validation.Parameters} to indicate that a particular <tt>value</tt> did not pass validation.
 * Everything returns an array as object and arrays can have multiple error messages returned.
 * This uses the Error class in case any additional property of an Error is needed at a later point.
 *
 * @memberOf Validation.Parameters
 * @method Return_Error
 * @param {string} err The error message to get returned. If <tt>errArgs</tt> is provided, then this will call util.format().
 * @param {string|Array} [errArgs] Optionally, the args to get passed to util.format().
 * @returns {Array} An array containing an object with an error property (which contains an Array of Error objects)
 */
function errorReturn(err, errArgs) {

  // this allows entering any number of fields to be formatted, as you can pass in one arg or an array of args
  if (errArgs) {
    var args = [err];
    if (_.isArray(errArgs)) {
      args = args.concat(errArgs);
    }
    else {
      args.push(errArgs);
    }
    err = util.format.apply(util, args);
  }

  var ret = {error: new Error(err)};
  return [ret];
}
exports.errorReturn = errorReturn;

/**
 * Used by the {@link Validation.Parameters} to indicate that a particular <tt>value</tt> passed validation.
 * Everything returns an array as object and arrays can have multiple messages returned.
 *
 * @memberOf Validation.Parameters
 * @method Return_Success
 * @param {Object} val The successfully parsed and validated value.
 * @returns {Array} An array containing an object with a value property that contains the value parsed successfully. This is done as
 * an array can validate uniqueness (but it let's each individual validation method handle it's own conversion so as not to duplicate effort).
 */
function successReturn(val) {
  var ret = {value: val};
  return [ret];
}
exports.successReturn = successReturn;

/**
 * Used by the {@link Validation.Parameters} to determine whether or not a particular <tt>value</tt> is required and not present.
 *
 * @memberOf Validation.Parameters
 * @method Is_Required
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} If <tt>value</tt> is required, is undefined, null, or an empty string, and there is no defaultValue, this will return the
 * result of {@link Validation.Parameters.Return_Error}. If there is a defaultValue, this will return an empty array, which indicates
 * that the defaultValue will be used, which is not validated. If <tt>value</tt> is not undefined, null, or an empty string,
 * this will return undefined indicating that further validation is required.
 */
function isRequired(param, value) {
  if (_.isUndefined(value) || _.isNull(value) || value === '') {
    var isParamRequired = param.required && !param.defaultValue;
    return isParamRequired
      ? errorReturn("%s is required", param.name)
      : successReturn(param.hasOwnProperty('defaultValue') ? param.defaultValue : value);
  }
}
exports.isRequired = isRequired;