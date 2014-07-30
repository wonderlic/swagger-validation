'use strict';

var helper = require('./helper');

/**
 * There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time
 * (more than likely due to the varied formats a date could have). Even using moment.js and something
 * like moment-parseformat or the native Date object has the potential to lead to false positives. Without
 * additional spec definition into what defines a date or date-time (or, ideally, the spec adds in a
 * 'format' for date / date time that can be used in a date validation function), this is too varied to
 * be handled by the validation framework. As such, there is no inherent validation to be done, but it
 * is a valid type, so just do required checks.
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Datetime
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value passed in unmodified.
 */
var validate = function(param, value) {
  if (value === undefined || value === null || value === '') {
    var isRequired = param.required && !param.defaultValue;
    return isRequired ? helper.errorReturn("%s is required", param.name) : [];
  }

  return helper.successReturn(value);
};

module.exports = exports = validate;