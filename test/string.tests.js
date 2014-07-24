'use strict';

var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('string', function() {
  it('should validate', function() {
    var value = 'Hi';
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleSuccess(ret, value);
  });

  it('should validate with large string', function() {
    var value = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleSuccess(ret, value);
  });

  it('should validate with enum', function() {
    var value = 'Hi';
    var ret = validate(helper.makeParam('string', false, undefined, ['Hi', 'Hello']), value);
    helper.validateSimpleSuccess(ret, value);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeParam('string', true), value);
    helper.validateSimpleError(ret, "testParam is required");
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeParam('string', true), undefined);
    helper.validateSimpleError(ret, 'testParam is required');
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeParam('string', true), value);
    helper.validateSimpleError(ret, 'testParam is required');
  });

  it('should not validate with enum', function() {
    var value = 'Hola';
    var ret = validate(helper.makeParam('string', false, undefined, ['Hi', 'Hello']), value);
    helper.validateSimpleError(ret, 'testParam is not a valid entry');
  });

  it('should not validate with enum case-sensitive', function() {
    var value = 'HI';
    var ret = validate(helper.makeParam('string', false, undefined, ['Hi', 'Hello']), value);
    helper.validateSimpleError(ret, 'testParam is not a valid entry');
  });

  it('should not validate with number', function() {
    var value = 1;
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleError(ret, 'testParam is not a type of string');
  });

  it('should not validate with boolean', function() {
    var value = true;
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleError(ret, 'testParam is not a type of string');
  });

  it('should not validate with empty object', function() {
    var value = {};
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleError(ret, 'testParam is not a type of string');
  });

  it('should not validate with empty array', function() {
    var value = [];
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleError(ret, 'testParam is not a type of string');
  });

  it('should not validate with array full of strings', function() {
    var value = ['this', 'is', 'a', 'string'];
    var ret = validate(helper.makeParam('string', false), value);
    helper.validateSimpleError(ret, 'testParam is not a type of string');
  });
});