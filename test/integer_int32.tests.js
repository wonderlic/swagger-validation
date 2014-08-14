'use strict';

var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('integer - int32', function() {
  it('should validate', function() {
    var value = 1;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with large number', function() {
    var value = 112312234132443;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with max number', function() {
    var value = 9007199254740991;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with min number', function() {
    var value = -9007199254740991;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with hex', function() {
    var value = 0x123;
    var transformedValue = 291;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with hex as string', function() {
    var value = "0x123";
    var transformedValue = 291;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with minimum', function() {
    var value = 1;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', '0'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with maximum', function() {
    var value = 1;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', null, '10'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with minimum inclusive', function() {
    var value = 0;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', '0'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with maximum inclusive', function() {
    var value = 32465;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', null, '32465'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with minimum and maximum', function() {
    var value = 3246;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', '321', '32465'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should not validate with minimum', function() {
    var value = -4563;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', '-2'), value);
    helper.validateError(ret, 1, ["testParam is below the minimum value"]);
  });

  it('should not validate with maximum', function() {
    var value = 11;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', null, '10'), value);
    helper.validateError(ret, 1, ["testParam is above the maximum value"]);
  });

  it('should not validate with minimum and maximum too low', function() {
    var value = 3;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', '321', '32465'), value);
    helper.validateError(ret, 1, ["testParam is below the minimum value"]);
  });

  it('should not validate with minimum and maximum too high', function() {
    var value = 324653;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32', '321', '32465'), value);
    helper.validateError(ret, 1, ["testParam is above the maximum value"]);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeNumberParam('integer', true, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeNumberParam('integer', true, 'int32'), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeNumberParam('integer', true, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with true boolean', function() {
    var value = true;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with false boolean', function() {
    var value = false;
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with too large number', function() {
    var value = 1e4500; // jshint ignore:line
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with negative too large number', function() {
    var value = -1e4500; // jshint ignore:line
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with object', function() {
    var value = {};
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with empty array', function() {
    var value = [];
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with empty array containing numbers', function() {
    var value = [1, 2];
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });

  it('should not validate with string', function() {
    var value = 'string';
    var ret = validate(helper.makeNumberParam('integer', false, 'int32'), value);
    helper.validateError(ret, 1, ["testParam is not a type of int32"]);
  });
});