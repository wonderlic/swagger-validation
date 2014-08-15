'use strict';

var _ = require('lodash');
var helper = require('./helper');

/**
 * Validates the path of the <tt>req</tt> that called validation. Additionally, this will honor
 * the allowMultiple flag.
 *
 * @memberOf Validation.ParamTypes
 * @method Validate_Header
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} req The request that this is validating
 * @param {Object} [models] Optionally, the models that are defined as part of this Swagger API definition
 * @param {Object} validationObj The validation object that is defined as part of this Swagger API definition
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.
 */
var body = function(param, req, models, validationObj) {
  var value = _.has(req.params, param.name) ? req.params[param.name] : undefined;
  var ret = helper.paramType(param, value, models, param.allowMultiple);
  if (!_.some(ret, function(val) { return val.hasOwnProperty('error'); })) {
    if (validationObj.replaceValues) {
      req.params[param.name] = helper.getValue(param, ret);
    }
  }
  return ret;
};
module.exports = exports = body;