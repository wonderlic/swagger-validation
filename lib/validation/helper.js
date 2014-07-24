'use strict';

var util = require('util');

module.exports = exports = {};

/**
 * ## errorReturn
 * Everything returns an array as object and arrays can have multiple error messages returned.
 * This uses the Error class in case any additional property of an Error is needed at a later point.
 *
 * @param {string} err The error message to get returned. If <tt>errArgs</tt> is provided, then this will call util.format().
 * @param {string} [errArgs] Optionally, the args to get passed to util.format().
 * @returns {Array} An array containing an object with an error property (which contains an Array of Error objects)
 */
exports.errorReturn = function(err, errArgs) {
  if (errArgs) {
    err = util.format(err, errArgs);
  }

  var ret = {error: new Error(err)};
  return [ret];
};

/**
 * ## successReturn
 * Everything returns an array as object and arrays can have multiple messages returned.
 *
 * @param {string} val The successfully parsed and validated value.
 * @returns {Array} An array containing an object with a value property that contains the value parsed successfully. This is done as
 * an array can validate uniqueness (but it let's each individual validation method handle it's own conversion so as not to duplicate effort).
 */
exports.successReturn = function(val) {
  var ret = {value: val};
  return [ret];
};