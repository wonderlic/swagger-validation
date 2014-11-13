'use strict';

var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('string', function() {
  it('should validate', function() {
    var value = 'Hi';
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with large string', function() {
    var value = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with enum', function() {
    var value = 'Hi';
    var ret = validate(helper.makeStringParam('string', false, undefined, undefined, ['Hi', 'Hello']), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate when pattern does match', function() {
    var value = 'Heya';
    var ret = validate(helper.makeStringParam('string', false, null, '^Heya$'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  var complexPattern = '^/dev/[^/]+(/[^/]+)*$';
  it('should detect when complex patterns do not match', function() {
    var value = 'should not match';
    var ret = validate(helper.makeStringParam('string', false, null, complexPattern), value);
    helper.validateError(ret, 1, ["testParam is not valid based on the pattern ^/dev/[^/]+(/[^/]+)*$"]);
  });

  it('should detect when complex patterns do match', function() {
    var value = '/dev/sda';
    var ret = validate(helper.makeStringParam('string', false, null, complexPattern), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  var basicUrlPattern = '^((https?|ftp|file):\/\/[-a-zA-Z0-9+&@#%?=~_|!:,.;]+)?(\/?[-a-zA-Z0-9+&@#%=~_|?]+)*$';
  it('should detect when more complex patterns do not match', function() {
    var value = 'http://foo@#$';
    var ret = validate(helper.makeStringParam('string', false, null, basicUrlPattern), value);
    helper.validateError(ret, 1, ["testParam is not valid based on the pattern ^((https?|ftp|file)://[-a-zA-Z0-9+&@#%?=~_|!:,.;]+)?(/?[-a-zA-Z0-9+&@#%=~_|?]+)*$"]);
  });

  it('should detect when more complex patterns do match', function() {
    var value = 'http://foo@#';
    var ret = validate(helper.makeStringParam('string', false, null, basicUrlPattern), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should not validate with string with true boolean passed in for pattern', function() {
    var ret = validate(helper.makeStringParam('string', false, null, true), 'Does not matter');
    helper.validateError(ret, 1, ['testParam is specified with an invalid pattern true']);
  });

  it('should not validate with string with false boolean passed in for pattern', function() {
    var ret = validate(helper.makeStringParam('string', false, null, false), 'Does not matter');
    helper.validateError(ret, 1, ['testParam is specified with an invalid pattern false']);
  });

  it('should not validate with string with object passed in for pattern', function() {
    var ret = validate(helper.makeStringParam('string', false, null, {}), 'Does not matter');
    helper.validateError(ret, 1, ['testParam is specified with an invalid pattern [object Object]']);
  });

  it('should not validate with string with random string passed in for pattern', function() {
    var ret = validate(helper.makeStringParam('string', false, null, 'paosdaksnjkdashdjgad'), 'Does not matter');
    helper.validateError(ret, 1, ['testParam is not valid based on the pattern paosdaksnjkdashdjgad']);
  });

  it('should not validate with required field null', function() {
    var value = null;
    var ret = validate(helper.makeStringParam('string', true), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeStringParam('string', true), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var value = '';
    var ret = validate(helper.makeStringParam('string', true), value);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with enum', function() {
    var value = 'Hola';
    var ret = validate(helper.makeStringParam('string', false, undefined, undefined, ['Hi', 'Hello']), value);
    helper.validateError(ret, 1, ["testParam is not a valid entry"]);
  });

  it('should not validate with enum case-sensitive', function() {
    var value = 'HI';
    var ret = validate(helper.makeStringParam('string', false, undefined, undefined, ['Hi', 'Hello']), value);
    helper.validateError(ret, 1, ["testParam is not a valid entry"]);
  });

  it('should not validate with number', function() {
    var value = 1;
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of string"]);
  });

  it('should not validate with boolean', function() {
    var value = true;
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of string"]);
  });

  it('should not validate with empty object', function() {
    var value = {};
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of string"]);
  });
  it('should not validate with empty array', function() {
    var value = [];
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of string"]);
  });

  it('should not validate with array full of strings', function() {
    var value = ['this', 'is', 'a', 'string'];
    var ret = validate(helper.makeStringParam('string', false), value);
    helper.validateError(ret, 1, ["testParam is not a type of string"]);
  });

  it('should not validate when pattern does not match', function() {
    var value = 'Heya';
    var ret = validate(helper.makeStringParam('string', false, null, '/^Goodbye$/i'), value);
    helper.validateError(ret, 1, ["testParam is not valid based on the pattern /^Goodbye$/i"]);
  });
});