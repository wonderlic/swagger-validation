'use strict';

var _ = require('lodash');
var paramType = require('./paramType');

/**
 * Validates the <tt>req</tt> against the <tt>spec</tt> that was defined.
 * @memberOf Validation
 * @method Validate
 * @param {Object} spec The specification that this is validating
 * @param {Object} req The request that this is validating
 * @param {Object} [models] Optionally, the models that are defined as part of this Swagger API definition
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.
 */
var validate = function(spec, req, models) {
  var ret = [];
  _.forEach(spec.parameters, function(param) {
    var paramReturn = paramType(param, req, models);
    if (_.some(paramReturn, function(val) { return val.hasOwnProperty('error'); })) {
      ret = ret.concat(paramReturn);
    }
  });
  return ret;
};
module.exports = exports = validate;