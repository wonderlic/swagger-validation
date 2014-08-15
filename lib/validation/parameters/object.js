'use strict';

var _ = require('lodash');
var helper = require('./helper');

/**
 * Ensures that the <tt>value</tt> that is passed in is a valid Object by iterating through each property on the
 * associated model and calling out to the respective validation method to validate that property. After validating
 * the properties on this object's model, it will recursively look to see if any other models have this model
 * in their subType array. If so, it will validate those properties as well. It will continue to do this until no
 * more types are found in the subType array.
 *
 * If "nothing" was passed into the validate function and it's required with no default value,
 * then this will throw a parameter is required error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Object
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, form, etc.)
 * @param {Object} models Any models that are defined for this API
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value with JSON.stringify() called on it.
 */
var validateObject = function(param, value, models) {
  var isRequired = helper.isRequired(param, value);
  if (isRequired) {
    return isRequired;
  }

  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return helper.errorReturn("%s is not a type of object", param.name);
  }

  var errors = [];
  var validateParameter = require('../parameter');
  var func = function(param, value) {
    var model = models[param.type];

    // it is probably irrelevant to check as a model without properties is pointless, but it is a nice sanity check
    if (model.properties) {
      _.forOwn(model.properties, function(val, key) {

        // the first statement returns undefined if there is no required property, so check for isRequired, and if undefined, become false
        var isRequired = model.required && _.some(model.required, function(val) { return val === key; });
        isRequired = isRequired || false;

        if (value.hasOwnProperty(key)) {

          // if this is an object reference (so it uses $ref instead of type), switch it to use type
          if (val.$ref) {
            val.type = val.$ref;
            delete val.$ref;
          }

          val.name = key;
          val.required = isRequired;
          var paramReturn = validateParameter(val, value[key], models);

          // if the return has any error properties, assume this returned errors, not values.
          if (_.some(paramReturn, function(val) { return val.hasOwnProperty('error'); })) {
            errors = errors.concat(paramReturn);
          } else {
            value[key] = _.chain(paramReturn).pluck('value').first().value();
          }
        }
        else if (isRequired) {
          errors = errors.concat(helper.errorReturn("%s is required", key));
        }
      });
    }

    // check to see if any other model has this as a subtype and validate the "superType"  properties as well
    _.forEach(models, function(model) {
      if (model.hasOwnProperty('subTypes')) {
        if (_.contains(model.subTypes, param.type)) {
          param.name = model.id;
          param.type = model.id;
          func(param, value);
        }
      }
    });
  };

  func(param, value);

  if (errors.length) {
    return _.sortBy(errors, function(val) { return val.error.message; });
  }
  return helper.successReturn(value);
};

/**
 * Redirects to the validate object method if this is a valid object in the model, else error.
 *
 * @memberOf Validation.Parameters
 * @method Validate_Object_Formats
 * @param {Object} param The Swagger param that was created for this operation
 * @param {Object} value The value that is passed in along the req (via body, header, etc.)
 * @param {Object} models Any models that are defined for this API
 * @returns {Array} An empty Array if the <tt>value</tt> was "nothing" and not required, else an array
 * containing an object with either an error property (which contains an Array of Error objects)
 * or a value property that contains the value parsed successfully.
 */
var validate = function(param, value, models) {
  return models.hasOwnProperty(param.type) ? validateObject(param, value, models) : helper.errorReturn('Unknown param type %s', param.type);
};
module.exports = exports = validate;