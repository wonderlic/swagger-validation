'use strict';

var moment = require('moment');
var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('set', function() {
  it('should validate with number with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', null, true), ['1', '2']);
    helper.validateSuccess(ret, 1, [
      [1, 2]
    ]);
  });

  it('should validate with number with float format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'float', null, true), [1, '2.0']);
    helper.validateSuccess(ret, 1, [
      [1, 2.0]
    ]);
  });

  it('should validate with number with double format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'double', null, true), [1.265, '2.2352', 2e0, 0x88]);
    helper.validateSuccess(ret, 1, [
      [1.265, 2.2352, 2e0, 0x88]
    ]);
  });

  it('should validate with integer with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', null, null, true), ['1', '2']);
    helper.validateSuccess(ret, 1, [
      [1, 2]
    ]);
  });

  it('should validate with integer with int32 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32', null, true), [1, '2.0']);
    helper.validateSuccess(ret, 1, [
      [1, 2.0]
    ]);
  });

  it('should validate with integer with int64 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64', null, true), [123132, 2e0, 0x88]);
    helper.validateSuccess(ret, 1, [
      [123132, 2e0, 0x88]
    ]);
  });

  it('should validate with string with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', null, null, true), ['These', 'are', 'a', 'lot', 'of', 'strings']);
    helper.validateSuccess(ret, 1, [
      ['These', 'are', 'a', 'lot', 'of', 'strings']
    ]);
  });

  it('should validate with string with byte format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', 'byte', null, true), [65, 35, 23]);
    helper.validateSuccess(ret, 1, [
      [65, 35, 23]
    ]);
  });

  it('should validate with string with date format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', 'date', 'M-D-YYYY', true), ['8-9-2014', '1-1-1970']);
    helper.validateSuccess(ret, 1, [
      [moment('2014-08-09').toDate(), moment('1970-01-01').toDate()]
    ]);
  });

  it('should validate with string with date-time format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', 'date-time', 'M-D-YYYY h:mmA', true), ['8-9-2014 12:00AM', '1-1-1970 1:32PM']);
    helper.validateSuccess(ret, 1, [
      [moment('2014-08-09T00:00:00').toDate(), moment('1970-01-01T13:32:00').toDate()]
    ]);
  });

  it('should validate with simple objects', function() {
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number'}
        }
      }
    };

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
      {id: 1.23},
      {id: 1.24},
      {id: 1.25}
    ], model);
    helper.validateSuccess(ret, 1, [
      [
        {id: 1.23},
        {id: 1.24},
        {id: 1.25}
      ]
    ]);
  });

  it('should validate with complex objects', function() {
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

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
      {test1: 1, test2: 'string', test3: true},
      {test1: 1, test2: 'string', test3: false}
    ], model);
    helper.validateSuccess(ret, 1, [
      [
        {test1: 1, test2: 'string', test3: true},
        {test1: 1, test2: 'string', test3: false}
      ]
    ]);
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
            pattern: 'M/D/YYYY'
          },
          datetime: {
            type: 'string',
            format: 'date-time',
            pattern: 'M/D/YYYY h:mmA'
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

    var ret = validate(helper.makeArrayParam(false, 'baz', null, null, true), [
      {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '8/9/2013',
        datetime: '1/1/2014 5:00PM',
        boolean: true
      }
    ], model);
    helper.validateSuccess(ret, 1, [
      [
        {
          number: 0x33,
          float: -2.231231,
          double: Number.MIN_VALUE,
          integer: 2e0,
          int32: -2312,
          int64: Number.MAX_VALUE,
          string: 'ThisIsAString ThatContains Many Spaces',
          byte: [35, 98],
          date: moment('2013-08-09').toDate(),
          datetime: moment('2014-01-01T17:00:00').toDate(),
          boolean: true
        }
      ]
    ]);
  });

  it('should not validate with required field null', function() {
    var ret = validate(helper.makeArrayParam(true, 'string', null, null, true), null);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field undefined', function() {
    var ret = validate(helper.makeArrayParam(true, 'number', null, null, true), undefined);
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with required field empty string', function() {
    var ret = validate(helper.makeArrayParam(true, 'integer', null, null, true), '');
    helper.validateError(ret, 1, ["testParam is required"]);
  });

  it('should not validate with empty object', function() {
    var ret = validate(helper.makeArrayParam(false, 'boolean', null, null, true), {});
    helper.validateError(ret, 1, ["testParam is not a type of set"]);
  });

  it('should not validate with one error with number with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', null, null, true), ['1', 'thisisastring']);
    helper.validateError(ret, 1, ["thisisastring is not a type of number"]);
  });

  it('should not validate with one error with number with float format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'float', null, true), [1, 'thisisastring']);
    helper.validateError(ret, 1, ["thisisastring is not a type of float"]);
  });

  it('should not validate with one error with number with double format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'double', null, true), [1.265, '2.2352', 2e0, 0x88, 'thisisastring']);
    helper.validateError(ret, 1, ["thisisastring is not a type of double"]);
  });

  it('should not validate with one error with integer with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', null, null, true), ['1', '2', 'thisisastring']);
    helper.validateError(ret, 1, ["thisisastring is not a type of integer"]);
  });

  it('should not validate with one error with integer with int32 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32', null, true), [1, '2.0', 'thisisastring']);
    helper.validateError(ret, 1, ["thisisastring is not a type of int32"]);
  });

  it('should not validate with one error with integer with int64 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64', null, true), [2e0, 0x88, 'thisisastring']);
    helper.validateError(ret, 1, ["thisisastring is not a type of int64"]);
  });

  it('should not validate with one error with string with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', null, null, true), ['These', 'are', 'a', 'lot', 'of', 'strings', 1]);
    helper.validateError(ret, 1, ["1 is not a type of string"]);
  });

  it('should not validate with two errors with number with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', null, null, true), ['1', 'thisisastring', 'thisisalsoastring']);
    helper.validateError(ret, 2, ["thisisastring is not a type of number", "thisisalsoastring is not a type of number"]);
  });

  it('should not validate with two errors with number with float format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'float', null, true), [1, 'thisisastring', 'thisisalsoastring']);
    helper.validateError(ret, 2, ["thisisastring is not a type of float", "thisisalsoastring is not a type of float"]);
  });

  it('should not validate with two errors with number with double format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'double', null, true), [1.265, '2.2352', 2e0, 0x88, 'thisisastring', 'thisisalsoastring']);
    helper.validateError(ret, 2, ["thisisastring is not a type of double", "thisisalsoastring is not a type of double"]);
  });

  it('should not validate with two errors with integer with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', null, null, true), ['1', '2', 'thisisastring', 'thisisalsoastring']);
    helper.validateError(ret, 2, ["thisisastring is not a type of integer", "thisisalsoastring is not a type of integer"]);
  });

  it('should not validate with two errors with integer with int32 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32', null, true), [1, '2.0', 'thisisastring', 'thisisalsoastring']);
    helper.validateError(ret, 2, ["thisisastring is not a type of int32", "thisisalsoastring is not a type of int32"]);
  });

  it('should not validate with two errors with integer with int64 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64', null, true), [2e0, 0x88, 'thisisastring', 'thisisalsoastring']);
    helper.validateError(ret, 2, ["thisisastring is not a type of int64", "thisisalsoastring is not a type of int64"]);
  });

  it('should not validate with two errors with string with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', null, null, true), ['These', 'are', 'a', 'lot', 'of', 1, true, 'strings']);
    helper.validateError(ret, 2, ["1 is not a type of string", "true is not a type of string"]);
  });

  it('should not validate with non-uniqueness with number with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', null, null, true), ['1', 1]);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with number with float format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'float', null, true), [11.23213, '11.23213']);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with number with double format', function() {
    var ret = validate(helper.makeArrayParam(false, 'number', 'double', null, true), [1.265, '2.2352', 2e0, 0x88, 2]);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with integer with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', null, null, true), ['1', '2', 1]);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with integer with int32 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int32', null, true), [1, '2.0', 2e0]);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with integer with int64 format', function() {
    var ret = validate(helper.makeArrayParam(false, 'integer', 'int64', null, true), [Number.MAX_VALUE, 2e0, 0x88, Number.MAX_VALUE]);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with string with no format', function() {
    var ret = validate(helper.makeArrayParam(false, 'string', null, null, true), ['These', 'are', 'a', 'lot', 'of', 'strings', 'strings']);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
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

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
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

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
      {test1: 'No', test2: true, test3: 1}
    ], model);
    helper.validateError(ret, 3, ["test1 is not a type of integer", "test2 is not a type of string", "test3 is not a type of boolean"]);
  });

  it('should not validate with non-uniqueness with empty objects', function() {
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

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
      {},
      {}
    ], model);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with simple objects', function() {
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number'}
        }
      }
    };

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
      {test: 1},
      {test: 1}
    ], model);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });

  it('should not validate with non-uniqueness with complicated objects', function() {

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

    var ret = validate(helper.makeArrayParam(false, 'Test', null, null, true), [
      {test1: 1, test2: 'string', test3: true},
      {test1: 1, test2: 'string', test3: true}
    ], model);
    helper.validateError(ret, 1, ["testParam is not unique. This may lead to an unintended loss of data"]);
  });
});