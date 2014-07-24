'use strict';

var _ = require('lodash');
var helper = require('./../helper');

/**
 * ## Validate String
 * Ensures that the <tt>value</tt> that is passed in is a valid string. Additionally, if an enum is
 * defined for this <tt>param</tt> ensure that the value is inside the enum list (which is case-sensitive).
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Null|Array} Null if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either a error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
module.exports = exports = function (param, value) {
  if (value === undefined || value === null || value === '') {
    var isRequired =  param.required && !param.defaultValue;
    return isRequired ? helper.errorReturn("%s is required", param.name) : null;
  }

  if (!_.isString(value)) {
    return helper.errorReturn("%s is not a type of string", param.name);
  }

  if (param.enum && !_.some(param.enum, function(val) { return val === value; })) {
    return helper.errorReturn("%s is not a valid entry", param.name);
  }

  return helper.successReturn(value);
};