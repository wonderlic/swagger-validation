'use strict';

var moment = require('moment');
var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('string - date', function() {
  it('should validate', function() {
    var value = '2014-01-01';
    var expected = moment('2014-01-01', 'YYYY-MM-DD').toDate();
    var ret = validate(helper.makeStringParam('string', false, 'date'), value);
    helper.validateSuccess(ret, 1, [expected]);
  });

  it('a date should always validate', function() {
    var expected = moment('2014-01-01', 'YYYY-MM-DD').toDate();
    var ret = validate(helper.makeStringParam('string', false, 'date'), expected);
    helper.validateSuccess(ret, 1, [expected]);
  });

  it('should validate with custom pattern', function() {
    var value = '1/1/2014 5:00PM';
    var expected = moment('1/1/2014', 'M/D/YYYY').toDate();
    var ret = validate(helper.makeStringParam('string', false, 'date', 'M/D/YYYY'), value);
    helper.validateSuccess(ret, 1, [expected]);
  });

  it('should not validate with random string', function() {
    var value = 'this is a string that does not match ISO 8601';
    var ret = validate(helper.makeStringParam('string', false, 'date'), value);
    helper.validateError(ret, 1, ["testParam is not valid based on the pattern for moment.ISO 8601"]);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeStringParam('string', true, 'date'), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeStringParam('string', true, 'date'), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeStringParam('string', true, 'date'), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });
});