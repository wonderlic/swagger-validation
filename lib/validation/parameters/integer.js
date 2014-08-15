'use strict';

require('./../../../lib/polyfills/integer');
var _ = require('lodash');
var helper = require('./helper');

/**
 * Ensures that the <tt>value</tt> that is passed in is a valid integer with a format of int64.
 * This allows all forms of a number (so 2, 2.0, 2e0, 0x2). As a hex value COULD be the hex representation
 * of an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the
 * way it wants to. Additionally, if a minimum or maximum is defined for this <tt>param</tt> ensure that the
 * value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined).
 *
 * This allows numbers between <tt>Number.MIN_VALUE</tt> (exclusive) and <tt>Number.MAX_VALUE</tt> (inclusive).
 * This does have issues with edge cases, however, (such as Number.MAX_VALUE + 1) as, per IEEE-754 2008 §4.3.1 spec,
 * JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not
 * Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive.
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Int64
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validateInt64 = function(param, value) {
  var type = param.format ? param.format : param.type;
  var isRequired = helper.isRequired(param, value);
  if (isRequired) {
    return isRequired;
  }

  // Calling Number constructor inadvertently casts empty arrays / booleans / "empty" strings
  // to 0, so checking if value is an array / boolean /  "empty" string explicitly.
  var val = Number(value);
  if (!Number.isInt64(val) || _.isArray(value) || _.isBoolean(value) || (_.isString(value) && value.trim() === '')) {
    return helper.errorReturn("%s is not a type of %s", [param.name, type]);
  }

  if (param.minimum) {
    var min = Number(param.minimum);
    if (min > val) {
      return helper.errorReturn("%s is below the minimum value", param.name);
    }
  }

  if (param.maximum) {
    var max = Number(param.maximum);
    if (max < val) {
      return helper.errorReturn("%s is above the maximum value", param.name);
    }
  }

  return helper.successReturn(val);
};

/**
 * Ensures that the <tt>value</tt> that is passed in is a valid integer (or an integer with a format of int32).
 * This allows all forms of a number (so 2, 2.0, 2e0, 0x2). As a hex value COULD be the hex representation
 * of an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the
 * way it wants to. Additionally, if a minimum or maximum is defined for this <tt>param</tt> ensure that the
 * value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined).
 *
 * This allows numbers between -9007199254740991 and +9007199254740991 (both inclusive) per
 * (@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger).
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Integer
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validateInteger = function(param, value) {
  var type = param.format ? param.format : param.type;
  var isRequired = helper.isRequired(param, value);
  if (isRequired) {
    return isRequired;
  }

  // Calling Number constructor inadvertently casts empty arrays / booleans / "empty" strings
  // to 0, so checking if value is an array / boolean /  "empty" string explicitly.
  var val = Number(value);
  if (!Number.isInteger(val) || _.isArray(value) || _.isBoolean(value) || (_.isString(value) && value.trim() === '')) {
    return helper.errorReturn("%s is not a type of %s", [param.name, type]);
  }

  if (param.minimum) {
    var min = Number(param.minimum);
    if (min > val) {
      return helper.errorReturn("%s is below the minimum value", param.name);
    }
  }

  if (param.maximum) {
    var max = Number(param.maximum);
    if (max < val) {
      return helper.errorReturn("%s is above the maximum value", param.name);
    }
  }

  return helper.successReturn(val);
};

/**
 * Redirects the different Integer formats to their respective validation methods. For now, all types of Integer
 * are validated the same way, with the exception of int64 as that is validated like a Number.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Integer_Formats
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validate = function(param, value) {
  var type = param.format ? param.format.toLowerCase() : param.type.toLowerCase();
  switch (type) {
    case 'int32':
    case 'integer':
      return validateInteger(param, value);
    case 'int64':
      return validateInt64(param, value);
    default:
      return helper.errorReturn('Unknown param type %s', type);
  }
};
module.exports = exports = validate;