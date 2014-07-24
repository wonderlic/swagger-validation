'use strict';

var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('boolean', function() {
  it('should validate with true', function() {
    var value = true;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleSuccess(ret, value);
  });

  it('should validate with false', function() {
    var value = false;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleSuccess(ret, value);
  });

  it('should validate with true string', function() {
    var value = 'true';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleSuccess(ret);
  });

  it('should validate with false string', function() {
    var value = 'false';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleSuccess(ret);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeParam('boolean', true), value);
    helper.validateSimpleError(ret, "testParam is required");
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeParam('boolean', true), undefined);
    helper.validateSimpleError(ret, "testParam is required");
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeParam('boolean', true), value);
    helper.validateSimpleError(ret, "testParam is required");
  });

  it('should not validate with empty object', function() {
    var value = {};
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });

  it('should not validate with number', function() {
    var value = 1;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });

  it('should not validate with True string', function() {
    var value = 'True';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });

  it('should not validate with False string', function() {
    var value = 'False';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });

  it('should not validate with random string', function() {
    var value = 'Hello World';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });

  it('should not validate with empty array', function() {
    var value = [];
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });

  it('should not validate with empty array containing booleans', function() {
    var value = [true, false];
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSimpleError(ret, "testParam is not a type of boolean");
  });
});