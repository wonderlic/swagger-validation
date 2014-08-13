'use strict';

var moment = require('moment');
var helper = require('./helper');

/**
 * There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time
 * (more than likely due to the varied formats a date could have). Even using moment.js and something
 * like moment-parseformat or the native Date object has the potential to lead to false positives. Therefore,
 * swagger-validation will accept a 'pattern' property on Swagger Property/Parameter Objects, which
 * should be a moment.js format string, which specifies the explicit format expected for date and date-time formats.
 * If no pattern property is detected, date and date-time formats will use moment.ISO_8601 by default.
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
 * or a value property that contains a Date object parsed from <tt>value</tt>. The time portion of the
 * Date object will automatically be zero'd out, since date formats are meant to ignore the time portion
 * of the date. If you need the time, use "date-time" instead.
 */
var validate = function(param, value) {
  var isRequired = helper.isRequired(param, value);
  if(isRequired) {
    return isRequired;
  }

  var pattern = param.pattern || moment.ISO_8601;
  var patternDisplay = param.pattern || 'ISO 8601';
  var date = moment(value, pattern);

  if(!date.isValid()) {
    return helper.errorReturn("%s is not a timestamp that can be parsed according to the expected pattern %s", [param.name, patternDisplay]);
  }

  return helper.successReturn(date.startOf('day').toDate());
};

module.exports = exports = validate;