'use strict';

exports = module.exports = {};

// helper method to make the basic param object
exports.makeParam = function(type, required, format, name) {
  return {
    type: type,
    required: required,
    name: name ? name : 'testParam',
    format: format ? format : undefined
  };
};

// helper method to make the string param object
exports.makeStringParam = function(type, required, format, pattern, enums, name) {
  return {
    type: type,
    required: required,
    format: format ? format : undefined,
    'enum': enums ? enums : undefined,
    name: name ? name : 'testParam',
    pattern: pattern || pattern === false ? pattern : undefined
  };
};

// helper method to make the number param object
exports.makeNumberParam = function(type, required, format, minimum, maximum, name) {
  return {
    type: type,
    required: required,
    format: format ? format : undefined,
    minimum: minimum ? minimum : undefined,
    maximum: maximum ? maximum : undefined,
    name: name ? name : 'testParam'
  };
};

// helper method to make the array / set param object
exports.makeArrayParam = function(required, itemType, itemFormat, itemPattern, uniqueItems, name) {
  return {
    type: 'Array',
    required: required,
    items: {
      type: itemType,
      format: itemFormat ? itemFormat : undefined,
      pattern: itemPattern ? itemPattern : undefined
    },
    uniqueItems: uniqueItems ? uniqueItems : undefined,
    name: name ? name : 'testParam'
  };
};

/* jshint ignore:start */
// JSHint has issues with expect library as not everything ends with or has methods

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;

// helper method to run all the unit test checks when it should succeed
exports.validateSuccess = function(ret, length, values) {
  expect(ret).to.exist;
  expect(_.isArray(ret)).to.be.true;
  expect(ret).to.have.length(length);

  // don't run this for certain checks (like the ones that convert strings to numbers)
  if (values) {
    for (var i = 0; i < values.length; i++) {
      var param = ret[i];
      expect(param).to.be.an('object');
      expect(param).to.have.ownProperty('value');

      var value = param.value;
      expect(value).to.eql(values[i]);
    }
  }
};

// helper method to run all the unit test checks when it should fail
exports.validateError = function(ret, length, errors) {
  expect(ret).to.exist;
  expect(_.isArray(ret)).to.be.true;
  expect(ret).to.have.length(length);

  for (var i = 0; i < errors.length; i++) {
    var param = ret[i];
    expect(param).to.be.an('object');
    expect(param).to.have.ownProperty('error');

    var error = param.error;
    expect(error).to.be.an.instanceof(Error);

    var errMessage = error.message;
    expect(errMessage).to.eql(errors[i]);
  }
};