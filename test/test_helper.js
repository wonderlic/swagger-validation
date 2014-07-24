'use strict';

/* jshint ignore:start */
// JSHint has issues with expect library as not everything ends with or has methods
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;

exports = module.exports = {};

// helper method to make the param object
exports.makeParam = function(type, required, format, enums, name) {
  return {
    type: type,
    required: required,
    name: name ? name : 'testParam',
    format: format ? format : undefined,
    'enum': enums ? enums : undefined
  };
};

// helper method to validate success for primitives / file
exports.validateSimpleSuccess = function(ret, value) {
  expect(ret).to.exist;
  expect(_.isArray(ret)).to.be.true;
  expect(ret).to.not.be.empty;
  expect(ret).to.have.length(1);

  var param = ret[0];
  expect(param).to.have.ownProperty('value');

  // don't run this for certain checks (like the ones that convert strings to numbers)
  if (value) {
    var paramVal = param.value;
    expect(paramVal).to.equal(value);
  }
};

// helper method to validate error for primitives / file
exports.validateSimpleError = function(ret, message) {
  expect(ret).to.exist;
  expect(_.isArray(ret)).to.be.true;
  expect(ret).to.not.be.empty;
  expect(ret).to.have.length(1);

  var param = ret[0];
  expect(param).to.be.an('object');
  expect(param).to.have.ownProperty('error');

  var error = param.error;
  expect(error).to.be.an.instanceof(Error);

  var errMessage = error.message;
  expect(errMessage).to.equal(message);
};
/* jshint ignore:end */