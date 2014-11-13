'use strict';

var moment = require('moment');
var helper = require('./helper');

/**
 * There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time
 * (more than likely due to the varied formats a date could have). Therefore, swagger-validation will accept a
 * 'pattern' property on the Swagger Property/Parameter Objects, which is a moment.js format string
 * that specifies the explicit format expected for the date format. If no pattern property is detected,
 * moment.ISO_8601 will be used by default.
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Date
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains a Date object parsed from <tt>value</tt>. Since the date format
 * is meant to ignore time, the time will be automatically removed from the returned value.
 * If the time is needed, use the parameter "date-time" instead.
 */
var validate = function(param, value) {
  var isRequired = helper.isRequired(param, value);
  if (isRequired) {
    return isRequired;
  }

  if (Object.prototype.toString.call(value) === "[object Date]") {
    return helper.successReturn(value);
  }

  var pattern = param.pattern || moment.ISO_8601;
  var patternDisplay = param.pattern || 'for moment.ISO 8601';
  var date = moment(value, pattern);

  if (!date.isValid()) {
    return helper.errorReturn("%s is not valid based on the pattern %s", [param.name, patternDisplay]);
  }

  return helper.successReturn(date.startOf('day').toDate());
};

module.exports = exports = validate;