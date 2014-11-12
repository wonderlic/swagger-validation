/* globals toString */
'use strict';

var _ = require('lodash');
var validators = require('./index');
var helper = require('./helper');

// Using incoming string create a native RegExp object.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_Searching_With_Flags
// http://www.w3schools.com/jsref/jsref_obj_regexp.asp
var regexpWithPattern = /^\/(.*)\/{1}([gimy]{0,4})$/;
var buildRegExpWithoutEval = function (string) {
    try {
        var rx;
        // If it's a valid regex with pattern use the two arg constructor otherwise pass the whole string in.
        var m = regexpWithPattern.exec(string);
        if (m && m.length === 3 && m[2] && m[2].length) {
            // There are flags - use the two arg constructor.
            var regex = m[1];
            var flags = m[2];
            rx = new RegExp(regex, flags);
        } else  {
            // No flags...
            rx = new RegExp(string);
        }
        return rx;
    }
    catch (err) {
    }
    return null;
};

/**
 * Ensures that the <tt>value</tt> that is passed in matches the <tt>param</tt>'s pattern property.
 * If <tt>param</tt> does not have a pattern property, pattern matching is skipped and <tt>value</tt>
 * is considered valid.  If <tt>param</tt> has an invalid pattern property a invalid pattern error is
 * thrown.
 *
 * @memberOf Validation.Parameters
 * @method Is_Pattern_Match
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Boolean} True if <tt>value</tt> matches pattern or no valid pattern exists, else false
 */
var isPatternMatch = function (param, value) {
    if (param.pattern) {
        var regExp;
        if (toString.call(param.pattern) === '[object String]') {
            regExp = buildRegExpWithoutEval(param.pattern);
        }
        if (regExp) {
            var result = regExp.exec(value);
            return result ? true : false;
        } else {
            throw helper.errorReturn("string property '%s' is specified with an invalid pattern: %s ", [param.name, param.pattern]);
        }
    }
    return true;
};

/**
 * Ensures that the <tt>value</tt> that is passed in is a valid string. Additionally, if an enum is
 * defined for this <tt>param</tt> ensure that the value is inside the enum list (which is case-sensitive).
 *
 * This also ensures that the <tt>value</tt> adheres to the <tt>pattern</tt> specified on the <tt>spec</tt>,
 * if a pattern is specified.
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_String
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validateString = function(param, value) {
    var isRequired = helper.isRequired(param, value);
    if(isRequired) {
        return isRequired;
    }

    if (!_.isString(value)) {
        return helper.errorReturn("%s is not a type of string", param.name);
    }

    if (param.enum && !_.some(param.enum, function(val) { return val === value; })) {
        return helper.errorReturn("%s is not a valid entry", param.name);
    }

    try {
        if (!isPatternMatch(param, value)) {
            return helper.errorReturn("%s is not valid based on the pattern %s", [param.name, param.pattern]);
        }
    } catch (error) {
        return error;
    }

    return helper.successReturn(value);
};

/**
 * Redirects the different String formats to their respective validation methods.
 *
 * @memberOf Validation.Parameters
 * @method Validate_String_Formats
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validate = function(param, value) {
  var type = param.format ? param.format.toLowerCase() : param.type.toLowerCase();
  switch (type) {
    case 'string':
      return validateString(param, value);
    case 'byte':
      return validators.byte(param, value);
    case 'date':
      return validators.date(param, value);
    case 'date-time':
      return validators.dateTime(param, value);
    default:
      return helper.errorReturn('Unknown param type %s', type);
  }
};
module.exports = exports = validate;