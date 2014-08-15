'use strict';

var paramTypes = require('./paramTypes');

/**
 * Ensures that the <tt>req</tt> that is passed in on the req is valid based upon the Swagger definition for this operation.
 * @memberOf Validation
 * @method Validate_ParamType
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} req The request that this is validating
 * @param {Object} [models] Optionally, the models that are defined as part of this Swagger API definition
 * @param {Object} validationObj The validation object that is defined as part of this Swagger API definition
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.
 */
var validateParamType = function(param, req, models, validationObj) {
  switch (param.paramType.toLowerCase()) {
    case 'q':
    case 'query':
      return paramTypes.query(param, req, models, validationObj);
    case 'path':
      return paramTypes.path(param, req, models, validationObj);
    case 'body':
      return paramTypes.body(param, req, models, validationObj);
    case 'form':
      return paramTypes.form(param, req, models, validationObj);
    case 'header':
      return paramTypes.header(param, req, models, validationObj);
  }
};
module.exports = exports = validateParamType;