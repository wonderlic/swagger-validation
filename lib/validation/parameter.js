'use strict';

var string = require('./validators/string');
var boolean = require('./validators/boolean');
var helper = require('./helper');

/**
 * ## Validate Parameter
 * Ensures that the <tt>value</tt> that is passed in on the req is valid based upon the Swagger definition for this operation.
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @param {Object} [models] Optionally, the models that are defined as part of this Swagger API definition
 * @returns {Null|Array} Null if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either a error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
module.exports = exports = function(param, value, models) {

  // If there is a format, it is more specific than just the type, so use that instead
  var paramType = param.format ? param.format.toLowerCase() : param.type.toLowerCase();

  switch (paramType) {
    case 'string':
      return string(param, value);
    case 'date':
      return date(param, value);
    case 'date-time':
      return date_time(param, value);
    case 'byte':
      return byte(param, value);
    case "long":
    case "number":
    case "float":
    case "double":
    case 'int64':
      return number(param, value);
    case 'integer':
      return integer(value, format, param);
    case "boolean":
      return boolean(param, value);
    case "array":
      return array(value, param);
    case "byte":
      return byte(value, param);
    case "file":
      return file(value, param);
    default:
      // As an object can literally be named almost anything, check in the models if this object name exists, else error
      return models.hasOwnProperty(param.type) ? object(value, param) : helper.errorReturn('Unknown param type %s', param.type);
  }
};