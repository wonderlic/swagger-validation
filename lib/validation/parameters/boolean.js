'use strict';

var _ = require('lodash');
var helper = require('./helper');

/**
 * Ensures that the <tt>value</tt> that is passed in is a valid boolean. This only handles native boolean types or
 * converting from 'true' / 'false' strings, as the concept is not uniform for other types (ie, if it's a number,
 * should it be 0 = false and 1 = true or should any non-zero number be true). However, this only handles strings
 * that are the string representation in JavaScript of their boolean counterparts, so True, TRUE, etc. will not validate.
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Boolean
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validate = function(param, value) {
  var isRequired = helper.isRequired(param, value);
  if (isRequired) {
    return isRequired;
  }

  if (_.isBoolean(value)) {
    return helper.successReturn(value);
  }

  if (value === 'true' || value === 'false') {
    return helper.successReturn(value === 'true');
  }

  return helper.errorReturn("%s is not a type of boolean", param.name);
};
module.exports = exports = validate;