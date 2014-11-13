'use strict';

var moment = require('moment');
var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('array', function() {
  it('should validate with number with no format', function() {
    var value = ['1', '2'];
    var transformedValue = [1, 2];
    var ret = validate(helper.makeArrayParam(false, 'number'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with number with float format', function() {
    var value = [1, '2.0'];
    var transformedValue = [1, 2.0];
    var ret = validate(helper.makeArrayParam(false, 'number', 'float'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with number with double format', function() {
    var value = [1.265, '2.2352', 2e0, 0x88];
    var transformedValue = [1.265, 2.2352, 2.0, 0x88];
    var ret = validate(helper.makeArrayParam(false, 'number', 'double'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with integer with no format', function() {
    var value = ['1', '2'];
    var transformedValue = [1, 2];
    var ret = validate(helper.makeArrayParam(false, 'integer'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with integer with int32 format', function() {
    var value = [1, '2.0'];
    var transformedValue = [1, 2.0];
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with integer with int64 format', function() {
    var value = [Number.MAX_VALUE, Number.MIN_VALUE + 1, 2.0, 2e0, 0x88];
    var transformedValue = [Number.MAX_VALUE, Number.MIN_VALUE + 1, 2.0, 2, 136];
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with string with no format', function() {
    var value = ['These', 'are', 'a', 'lot', 'of', 'strings'];
    var ret = validate(helper.makeArrayParam(false, 'string'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with string with byte format', function() {
    var value = [65, 35, 23];
    var ret = validate(helper.makeArrayParam(false, 'string', 'byte'), value);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with string with date format', function() {
    var value = ['8-9-2014', '1-1-1970'];
    var transformedValue = [moment('2014-08-09').toDate(), moment('1970-01-01').toDate()];
    var ret = validate(helper.makeArrayParam(false, 'string', 'date', 'M-D-YYYY'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with string with date-time format', function() {
    var value = ['8-9-2014 12:00AM', '1-1-1970 1:32PM'];
    var transformedValue = [moment('2014-08-09T00:00:00').toDate(), moment('1970-01-01T13:32:00').toDate()];
    var ret = validate(helper.makeArrayParam(false, 'string', 'date-time', 'M-D-YYYY h:mmA'), value);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should validate with simple objects', function() {
    var value = [
      {id: 1.23},
      {id: 1.23},
      {id: 1.23}
    ];
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number'}
        }
      }
    };
    var ret = validate(helper.makeArrayParam(false, 'Test'), value, model);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with complex objects', function() {
    var value = [
      {test1: 1, test2: 'string', test3: true},
      {test1: 1, test2: 'string', test3: false}
    ];
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          test1: {type: 'integer'},
          test2: {type: 'string'},
          test3: {type: 'boolean'}
        }
      }
    };
    var ret = validate(helper.makeArrayParam(false, 'Test'), value, model);
    helper.validateSuccess(ret, 1, [value]);
  });

  it('should validate with object inheritance', function() {
    var model = {
      foo: {
        id: 'foo',
        name: 'foo',
        subTypes: ["bar"],
        discriminator: "name",
        properties: {
          number: {type: 'number'},
          float: {type: 'number', format: 'float'},
          double: {type: 'number', format: 'double'},
          integer: {type: 'integer'},
          int32: {type: 'integer', format: 'int32'}
        }
      },
      bar: {
        id: 'bar',
        name: 'bar',
        subTypes: ["baz"],
        discriminator: "name",
        properties: {
          int64: {type: 'integer', format: 'int64'},
          string: {type: 'string'},
          byte: {type: 'string', format: 'byte'},
          date: {
            type: 'string',
            format: 'date',
            pattern: 'M-D-YYYY'
          },
          datetime: {
            type: 'string',
            format: 'date-time',
            pattern: 'M-D-YYYY h:mmA'
          }
        }
      },
      baz: {
        id: 'baz',
        name: 'baz',
        properties: {
          boolean: {type: 'boolean'}
        }
      }
    };
    var value = [
      {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'this is a string ThatContains Many Spaces',
        byte: [35, 98],
        date: '8/9/2013',
        datetime: '1/1/2014 5:00PM',
        boolean: true
      }
    ];
    var transformedValue = [
      {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'this is a string ThatContains Many Spaces',
        byte: [35, 98],
        date: moment('2013-08-09').toDate(),
        datetime: moment('2014-01-01T17:00:00').toDate(),
        boolean: true
      }
    ];
    var ret = validate(helper.makeArrayParam(false, 'baz'), value, model);
    helper.validateSuccess(ret, 1, [transformedValue]);
  });

  it('should not validate with required field null', function() {
    var ret = validate(helper.makeArrayParam(true, 'string'), null);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeArrayParam(true, 'number'), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var ret = validate(helper.makeArrayParam(true, 'integer'), '');
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with empty object', function() {
    var ret = validate(helper.makeArrayParam(false, 'boolean'), {});
    helper.validateError(ret, 1, ["testParam is not a type of array"]);
  });

  it('should not validate with one error with number with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number'), ['1', 'this is a string']);
    helper.validateError(ret, 1, ["this is a string is not a type of number"]);
  });

  it('should not validate with one error with number with float format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'float'), [1, 'this is a string']);
    helper.validateError(ret, 1, ["this is a string is not a type of float"]);
  });

  it('should not validate with one error with number with double format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'double'), [1.265, '2.2352', 2e0, 0x88, 'this is a string']);
    helper.validateError(ret, 1, ["this is a string is not a type of double"]);
  });

  it('should not validate with one error with integer with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer'), ['1', '2', 'this is a string']);
    helper.validateError(ret, 1, ["this is a string is not a type of integer"]);
  });

  it('should not validate with one error with integer with int32 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32'), [1, '2.0', 'this is a string']);
    helper.validateError(ret, 1, ["this is a string is not a type of int32"]);
  });

  it('should not validate with one error with integer with int64 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64'), [1234, 2e0, 0x88, 'this is a string']);
    helper.validateError(ret, 1, ["this is a string is not a type of int64"]);
  });

  it('should not validate with one error with string with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string'), ['These', 'are', 'a', 'lot', 'of', 'strings', 1]);
    helper.validateError(ret, 1, ["1 is not a type of string"]);
  });

  it('should not validate with two errors with number with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number'), ['1', 'this is a string', 'this is also a string']);
    helper.validateError(ret, 2, ["this is a string is not a type of number", "this is also a string is not a type of number"]);
  });

  it('should not validate with two errors with number with float format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'float'), [1, 'this is a string', 'this is also a string']);
    helper.validateError(ret, 2, ["this is a string is not a type of float", "this is also a string is not a type of float"]);
  });

  it('should not validate with two errors with number with double format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'double'), [1.265, '2.2352', 2e0, 0x88, 'this is a string', 'this is also a string']);
    helper.validateError(ret, 2, ["this is a string is not a type of double", "this is also a string is not a type of double"]);
  });

  it('should not validate with two errors with integer with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer'), ['1', '2', 'this is a string', 'this is also a string']);
    helper.validateError(ret, 2, ["this is a string is not a type of integer", "this is also a string is not a type of integer"]);
  });

  it('should not validate with two errors with integer with int32 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32'), [1, '2.0', 'this is a string', 'this is also a string']);
    helper.validateError(ret, 2, ["this is a string is not a type of int32", "this is also a string is not a type of int32"]);
  });

  it('should not validate with two errors with integer with int64 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64'), [Number.MAX_VALUE - 123123123123, 2e0, 0x88, 'this is a string', 'this is also a string']);
    helper.validateError(ret, 2, ["this is a string is not a type of int64", "this is also a string is not a type of int64"]);
  });

  it('should not validate with two errors with string with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string'), ['These', 'are', 'a', 'lot', 'of', 1, true, 'strings']);
    helper.validateError(ret, 2, ["1 is not a type of string", "true is not a type of string"]);
  });

  it('should not validate with simple objects', function() {
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number'}
        }
      }
    };

    var ret = validate(helper.makeArrayParam(false, 'Test'), [
      {id: 1},
      {id: 'Yo'}
    ], model);
    helper.validateError(ret, 1, ["id is not a type of number"]);
  });

  it('should not validate with complex objects', function() {

    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          test1: {type: 'integer'},
          test2: {type: 'string'},
          test3: {type: 'boolean'}
        }
      }
    };

    var ret = validate(helper.makeArrayParam(false, 'Test'), [
      {test1: 'No', test2: true, test3: 1}
    ], model);
    helper.validateError(ret, 3, ["test1 is not a type of integer", "test2 is not a type of string", "test3 is not a type of boolean"]);
  });
});