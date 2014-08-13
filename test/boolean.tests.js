'use strict';

var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('boolean', function() {
  it('should validate with true', function() {
    var value = true;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with false', function() {
    var value = false;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with true string', function() {
    var value = 'true';
    var transformedValue = true;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with false string', function() {
    var value = 'false';
    var transformedValue = false;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeParam('boolean', true), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeParam('boolean', true), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeParam('boolean', true), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with empty object', function() {
    var value = {};
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });

  it('should not validate with number', function() {
    var value = 1;
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });

  it('should not validate with True string', function() {
    var value = 'True';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });

  it('should not validate with False string', function() {
    var value = 'False';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });

  it('should not validate with random string', function() {
    var value = 'Hello World';
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });

  it('should not validate with empty array', function() {
    var value = [];
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });

  it('should not validate with empty array containing booleans', function() {
    var value = [true, false];
    var ret = validate(helper.makeParam('boolean', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of boolean"]);
  });
});