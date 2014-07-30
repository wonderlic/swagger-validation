'use strict';

var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('string - byte', function() {
  it('should validate', function() {
    var value = [65, 32];
    var ret = validate(helper.makeStringParam('string', false, 'byte'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with random string', function() {
    var value = 'this is a string';
    var ret = validate(helper.makeStringParam('string', false, 'byte'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeStringParam('string', true, 'byte'), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeStringParam('string', true, 'byte'), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeStringParam('string', true, 'byte'), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });
});