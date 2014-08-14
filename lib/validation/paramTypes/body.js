'use strict';

var _ = require('lodash');
var helper = require('./helper');

/**
 * Validates the body of the <tt>req</tt> that called validation.
 *
 * @memberOf Validation.ParamTypes
 * @method Validate_Body
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} req The request that this is validating
 * @param {Object} [models] Optionally, the models that are defined as part of this Swagger API definition
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.
 */
var body = function(param, req, models) {
  var value = req.body;
  var ret = helper(param, value, models, false);
  if (!_.some(ret, function(val) { return val.hasOwnProperty('error'); })) {
    var parsedValue = _.chain(ret).pluck('value').first().value();
    req.body = parsedValue;
  }
  return ret;
};
module.exports = exports = body;