'use strict';

var moment = require('moment');
var helper = require('./test_helper');
var validate = require('../lib/validation/parameter');

describe('object', function() {

  describe('basic tests', function() {
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number'}
        }
      }
    };

    it('should validate with parameter null', function() {
      var value = null;
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should validate with parameter undefined', function() {
      var value = void(0);
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should validate with parameter empty', function() {
      var value = {};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with required parameter null', function() {
      var ret = validate(helper.makeParam('Test', true), null, model);
      helper.validateError(ret, 1, ["testParam is required"]);
    });

    it('should not validate with required parameter undefined', function() {
      var ret = validate(helper.makeParam('Test', true), undefined, model);
      helper.validateError(ret, 1, ["testParam is required"]);
    });

    it('should not validate with array', function() {
      var ret = validate(helper.makeParam('Test', true), [], model);
      helper.validateError(ret, 1, ["testParam is not a type of object"]);
    });

    it('should not validate with Number', function() {
      var ret = validate(helper.makeParam('Test', true), 12, model);
      helper.validateError(ret, 1, ["testParam is not a type of object"]);
    });

    it('should not validate with string', function() {
      var ret = validate(helper.makeParam('Test', true), 'thisisastring', model);
      helper.validateError(ret, 1, ["testParam is not a type of object"]);
    });
  });

  describe('one number no format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of number"]);
    });
  });

  describe('one number float format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number', format: 'float'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1.233242};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of float"]);
    });
  });

  describe('one number double format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'number', format: 'double'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1.233242};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of double"]);
    });
  });

  describe('one integer no format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'integer'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of integer"]);
    });
  });

  describe('one integer int32 format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'integer', format: 'int32'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of int32"]);
    });
  });

  describe('one integer int64 format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'integer', format: 'int64'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: '  '}, model);
      helper.validateError(ret, 1, ["id is not a type of int64"]);
    });
  });

  describe('one string no format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'string'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 'this is a string'};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: {}}, model);
      helper.validateError(ret, 1, ["id is not a type of string"]);
    });
  });

  describe('one string byte format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'string', format: 'byte'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: [65, 43]};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });
  });

  describe('one string date format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {
            type: 'string',
            format: 'date'
          }
        }
      }
    };

    it('should validate', function() {
      var value = {id: '2014-08-08'};
      var transformedValue = {id: moment('2014-08-08').toDate()};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });
  });

  describe('one string date-time format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'string', format: 'date-time'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: '2014-08-09T12:43:00'};
      var transformedValue = {id: moment('2014-08-09T12:43:00').toDate()};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });
  });

  describe('one boolean no format not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          id: {type: 'boolean'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 'true'};
      var transformedValue = {id: true};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', false), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of boolean"]);
    });
  });

  describe('one number no format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'number'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of number"]);
    });
  });

  describe('one number float format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'number', format: 'float'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1.233242};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of float"]);
    });
  });

  describe('one number double format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'number', format: 'double'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1.233242};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of double"]);
    });
  });

  describe('one integer no format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'integer'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of integer"]);
    });
  });

  describe('one integer int32 format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'integer', format: 'int32'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of int32"]);
    });
  });

  describe('one integer int64 format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'integer', format: 'int64'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 1};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: ' '}, model);
      helper.validateError(ret, 1, ["id is not a type of int64"]);
    });
  });

  describe('one string no format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'string'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 'this is a string'};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: {}}, model);
      helper.validateError(ret, 1, ["id is not a type of string"]);
    });
  });

  describe('one string byte format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'string', format: 'byte'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: [65, 43]};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });
  });

  describe('one string date format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            format: 'date'
          }
        }
      }
    };

    it('should validate', function() {
      var value = {id: '2014-08-08'};
      var transformedValue = {id: moment('2014-08-08').toDate()};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });
  });

  describe('one string date-time format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    };

    it('should validate', function() {
      var value = {id: '2014-08-09T12:43:00'};
      var transformedValue = {id: moment('2014-08-09T12:43:00').toDate()};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });
  });

  describe('one boolean no format required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['id'],
        properties: {
          id: {type: 'boolean'}
        }
      }
    };

    it('should validate', function() {
      var value = {id: 'true'};
      var transformedValue = {id: true};
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate with missing parameter', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 1, ["id is required"]);
    });

    it('should not validate', function() {
      var ret = validate(helper.makeParam('Test', true), {id: 'thisisastring'}, model);
      helper.validateError(ret, 1, ["id is not a type of boolean"]);
    });
  });

  describe('one of each type not required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        properties: {
          number: {type: 'number'},
          float: {type: 'number', format: 'float'},
          double: {type: 'number', format: 'double'},
          integer: {type: 'integer'},
          int32: {type: 'integer', format: 'int32'},
          int64: {type: 'integer', format: 'int64'},
          string: {type: 'string'},
          byte: {type: 'string', format: 'byte'},
          date: {type: 'string', format: 'date'},
          datetime: {type: 'string', format: 'date-time'},
          boolean: {type: 'boolean'}
        }
      }
    };

    it('should validate', function() {
      var value = {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '2013-08-09',
        datetime: '2014-01-01T17:00',
        boolean: true
      };
      var transformedValue = {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: moment('2013-08-09').toDate(),
        datetime: moment('2014-01-01T17:00').toDate(),
        boolean: true
      };
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate all invalid', function() {
      var ret = validate(helper.makeParam('Test', true), {
        number: 'Random String',
        float: true,
        double: [323.33],
        integer: {},
        int32: Number.MIN_VALUE,
        int64: Number.MAX_VALUE + Number.MAX_VALUE,
        string: 1,
        byte: false,
        date: Number(1),
        datetime: Number(2.23526),
        boolean: 'Not a boolean'
      }, model);
      helper.validateError(ret, 10, [
        'boolean is not a type of boolean',
        'date is not valid based on the pattern for moment.ISO 8601',
        'datetime is not valid based on the pattern for moment.ISO 8601',
        'double is not a type of double',
        'float is not a type of float',
        'int32 is not a type of int32',
        'int64 is not a type of int64',
        'integer is not a type of integer',
        'number is not a type of number',
        'string is not a type of string'
      ]);
    });

    it('should not validate half invalid', function() {
      var ret = validate(helper.makeParam('Test', true), {
        number: 'Random String',
        float: true,
        double: [323.33],
        integer: {},
        int32: -2312,
        int64: Number.MIN_VALUE + 1,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '2013-08-09',
        datetime: '2014-01-01T17:00',
        boolean: true
      }, model);
      helper.validateError(ret, 4, [
        'double is not a type of double',
        'float is not a type of float',
        'integer is not a type of integer',
        'number is not a type of number'
      ]);
    });

    it('should not validate other half invalid', function() {
      var ret = validate(helper.makeParam('Test', true), {
        number: 0x33,
        float: -2.231231,
        double: -Number.MIN_VALUE,
        integer: 2e8,
        int32: Number.MIN_VALUE,
        int64: Number.MAX_VALUE + Number.MAX_VALUE,
        string: 1,
        byte: false,
        date: Number(1),
        datetime: Number(2.3265),
        boolean: 'Not a boolean'
      }, model);
      helper.validateError(ret, 6, [
        'boolean is not a type of boolean',
        'date is not valid based on the pattern for moment.ISO 8601',
        'datetime is not valid based on the pattern for moment.ISO 8601',
        'int32 is not a type of int32',
        'int64 is not a type of int64',
        'string is not a type of string'
      ]);
    });
  });

  describe('one of each type required', function() {
    // each section defines it's own validation parameters
    var model = {
      Test: {
        id: 'Test',
        name: 'Test',
        required: ['param1', 'param2', 'param3', 'param4', 'param5', 'param6', 'param7', 'param8', 'param9', 'param10', 'param11'],
        properties: {
          param1: {type: 'number'},
          param2: {type: 'number', format: 'float'},
          param3: {type: 'number', format: 'double'},
          param4: {type: 'integer'},
          param5: {type: 'integer', format: 'int32'},
          param6: {type: 'integer', format: 'int64'},
          param7: {type: 'string'},
          param8: {type: 'string', format: 'byte'},
          param9: {type: 'string', format: 'date'},
          param10: {type: 'string', format: 'date-time'},
          param11: {type: 'boolean'}
        }
      }
    };

    it('should validate', function() {
      var value = {
        param1: 0x33,
        param2: -2.231231,
        param3: Number.MIN_VALUE,
        param4: 2e0,
        param5: -2312,
        param6: Number.MAX_VALUE,
        param7: 'ThisIsAString ThatContains Many Spaces',
        param8: [35, 98],
        param9: '2013-08-09',
        param10: '2014-01-01T17:00:00',
        param11: true
      };
      var transformedValue = {
        param1: 0x33,
        param2: -2.231231,
        param3: Number.MIN_VALUE,
        param4: 2e0,
        param5: -2312,
        param6: Number.MAX_VALUE,
        param7: 'ThisIsAString ThatContains Many Spaces',
        param8: [35, 98],
        param9: moment('2013-08-09').toDate(),
        param10: moment('2014-01-01T17:00:00').toDate(),
        param11: true
      };
      var ret = validate(helper.makeParam('Test', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate all missing', function() {
      var ret = validate(helper.makeParam('Test', true), {}, model);
      helper.validateError(ret, 11, ['param1 is required', 'param10 is required', 'param11 is required', 'param2 is required', 'param3 is required', 'param4 is required', 'param5 is required', 'param6 is required', 'param7 is required', 'param8 is required', 'param9 is required']);
    });
  });

  describe('one of each type with two level inheritance not required', function() {
    // each section defines it's own validation parameters
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
          date: {type: 'string', format: 'date'},
          datetime: {type: 'string', format: 'date-time'}
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

    it('should validate', function() {
      var value = {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '2013-08-09',
        datetime: '2014-01-01T17:00:00',
        boolean: true
      };
      var transformedValue = {
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
      };
      var ret = validate(helper.makeParam('baz', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate all invalid', function() {
      var ret = validate(helper.makeParam('baz', true), {
        number: 'Random String',
        float: true,
        double: [323.33],
        integer: {},
        int32: Number.MIN_VALUE,
        int64: Number.MAX_VALUE + Number.MAX_VALUE,
        string: 1,
        byte: false,
        date: Number(1),
        datetime: Number(2.2356),
        boolean: 'Not a boolean'
      }, model);
      helper.validateError(ret, 10, [
        'boolean is not a type of boolean',
        'date is not valid based on the pattern for moment.ISO 8601',
        'datetime is not valid based on the pattern for moment.ISO 8601',
        'double is not a type of double',
        'float is not a type of float',
        'int32 is not a type of int32',
        'int64 is not a type of int64',
        'integer is not a type of integer',
        'number is not a type of number',
        'string is not a type of string'
      ]);
    });

    it('should not validate half invalid', function() {
      var ret = validate(helper.makeParam('baz', true), {
        number: 'Random String',
        float: true,
        double: [323.33],
        integer: {},
        int32: -2312,
        int64: Number.MIN_VALUE + 1,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '2014-08-09',
        datetime: '2014-01-01T17:00:00Z',
        boolean: true
      }, model);
      helper.validateError(ret, 4, ['double is not a type of double', 'float is not a type of float', 'integer is not a type of integer', 'number is not a type of number']);
    });

    it('should not validate other half invalid', function() {
      var ret = validate(helper.makeParam('baz', true), {
        number: 0x33,
        float: -2.231231,
        double: -Number.MIN_VALUE,
        integer: 2e8,
        int32: Number.MIN_VALUE,
        int64: Number.MAX_VALUE + Number.MAX_VALUE,
        string: 1,
        byte: false,
        date: Number(1),
        datetime: Number(2.2356),
        boolean: 'Not a boolean'
      }, model);
      helper.validateError(ret, 6, [
        'boolean is not a type of boolean',
        'date is not valid based on the pattern for moment.ISO 8601',
        'datetime is not valid based on the pattern for moment.ISO 8601',
        'int32 is not a type of int32',
        'int64 is not a type of int64',
        'string is not a type of string'
      ]);
    });
  });

  describe('one with object parameter not required', function() {
    var model = {
      bar: {
        id: 'bar',
        name: 'bar',
        properties: {
          array: helper.makeArrayParam(false, 'boolean')
        }
      },
      foo: {
        id: 'foo',
        name: 'foo',
        properties: {
          obj: {$ref: 'bar'},
          integer: {type: 'integer'}
        }
      }
    };

    it('should validate', function() {
      var value = {
        obj: {array: [true, false, true]},
        integer: 1
      };
      var ret = validate(helper.makeParam('foo', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should validate all missing', function() {
      var ret = validate(helper.makeParam('foo', true), {}, model);
      helper.validateSuccess(ret, 1, [
        {}
      ]);
    });

    it('should validate array missing', function() {
      var value = {
        obj: {},
        integer: 1
      };
      var ret = validate(helper.makeParam('foo', true), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate all invalid', function() {
      var value = {
        obj: [true, false, true],
        integer: false
      };
      var ret = validate(helper.makeParam('foo', true), value, model);
      helper.validateError(ret, 2, ['integer is not a type of integer', 'obj is not a type of object']);
    });

    it('should not validate array invalid', function() {
      var value = {
        obj: {array: ['1']},
        integer: 1
      };
      var ret = validate(helper.makeParam('foo', true), value, model);
      helper.validateError(ret, 1, ['1 is not a type of boolean']);
    });
  });

  describe('one with required object parameter', function() {
    var model = {
      bar: {
        id: 'bar',
        name: 'bar',
        required: ['array'],
        properties: {
          array: helper.makeArrayParam(false, 'boolean')
        }
      },
      foo: {
        id: 'foo',
        name: 'foo',
        required: ['obj', 'integer'],
        properties: {
          obj: {$ref: 'bar'},
          integer: {type: 'integer'}
        }
      }
    };

    it('should validate', function() {
      var value = {
        obj: {array: [true, false, true]},
        integer: 1
      };
      var ret = validate(helper.makeParam('foo', false), value, model);
      helper.validateSuccess(ret, 1, [value]);
    });

    it('should not validate array missing', function() {
      var value = {
        obj: {},
        integer: 1
      };
      var ret = validate(helper.makeParam('foo', true), value, model);
      helper.validateError(ret, 1, ['array is required']);
    });

    it('should not validate all invalid', function() {
      var value = {
        obj: [true, false, true],
        integer: false
      };
      var ret = validate(helper.makeParam('foo', true), value, model);
      helper.validateError(ret, 2, ['integer is not a type of integer', 'obj is not a type of object']);
    });

    it('should not validate array invalid', function() {
      var value = {
        obj: {array: ['1']},
        integer: 1
      };
      var ret = validate(helper.makeParam('foo', true), value, model);
      helper.validateError(ret, 1, ['1 is not a type of boolean']);
    });

    it('should not validate all missing', function() {
      var ret = validate(helper.makeParam('foo', true), {}, model);
      helper.validateError(ret, 2, ['integer is required', 'obj is required']);
    });
  });

  describe('one of each type with two level inheritance required', function() {
    // each section defines it's own validation parameters
    var model = {
      foo: {
        id: 'foo',
        name: 'foo',
        subTypes: ["bar"],
        discriminator: "name",
        required: ['number', 'float', 'double', 'integer', 'int32'],
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
        required: ['int64', 'string', 'byte', 'date', 'datetime'],
        properties: {
          int64: {type: 'integer', format: 'int64'},
          string: {type: 'string'},
          byte: {type: 'string', format: 'byte'},
          date: {type: 'string', format: 'date'},
          datetime: {type: 'string', format: 'date-time'}
        }
      },
      baz: {
        id: 'baz',
        name: 'baz',
        required: ['boolean'],
        properties: {
          boolean: {type: 'boolean'}
        }
      }
    };

    it('should validate', function() {
      var value = {
        number: 0x33,
        float: -2.231231,
        double: Number.MIN_VALUE,
        integer: 2e0,
        int32: -2312,
        int64: Number.MAX_VALUE,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '2013-08-09',
        datetime: '2014-01-01T17:00:00',
        boolean: true
      };
      var transformedValue = {
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
      };
      var ret = validate(helper.makeParam('baz', false), value, model);
      helper.validateSuccess(ret, 1, [transformedValue]);
    });

    it('should not validate all invalid', function() {
      var ret = validate(helper.makeParam('baz', true), {
        number: 'Random String',
        float: true,
        double: [323.33],
        integer: {},
        int32: Number.MIN_VALUE,
        int64: Number.MAX_VALUE + Number.MAX_VALUE,
        string: 1,
        byte: false,
        date: Number(1),
        datetime: Number(2.2356),
        boolean: 'Not a boolean'
      }, model);
      helper.validateError(ret, 10, [
        'boolean is not a type of boolean',
        'date is not valid based on the pattern for moment.ISO 8601',
        'datetime is not valid based on the pattern for moment.ISO 8601',
        'double is not a type of double',
        'float is not a type of float',
        'int32 is not a type of int32',
        'int64 is not a type of int64',
        'integer is not a type of integer',
        'number is not a type of number',
        'string is not a type of string'
      ]);
    });

    it('should not validate half invalid', function() {
      var ret = validate(helper.makeParam('baz', true), {
        number: 'Random String',
        float: true,
        double: [323.33],
        integer: {},
        int32: -2312,
        int64: Number.MIN_VALUE + 1,
        string: 'ThisIsAString ThatContains Many Spaces',
        byte: [35, 98],
        date: '2013-08-09',
        datetime: '2014-01-01T17:00:00Z',
        boolean: true
      }, model);
      helper.validateError(ret, 4, ['double is not a type of double', 'float is not a type of float', 'integer is not a type of integer', 'number is not a type of number']);
    });

    it('should not validate other half invalid', function() {
      var ret = validate(helper.makeParam('baz', true), {
        number: 0x33,
        float: -2.231231,
        double: -Number.MIN_VALUE,
        integer: 2e8,
        int32: Number.MIN_VALUE,
        int64: Number.MAX_VALUE + Number.MAX_VALUE,
        string: 1,
        byte: false,
        date: Number(1),
        datetime: Number(2.2356),
        boolean: 'Not a boolean'
      }, model);
      helper.validateError(ret, 6, [
        'boolean is not a type of boolean',
        'date is not valid based on the pattern for moment.ISO 8601',
        'datetime is not valid based on the pattern for moment.ISO 8601',
        'int32 is not a type of int32',
        'int64 is not a type of int64',
        'string is not a type of string'
      ]);
    });

    it('should not validate all missing', function() {
      var ret = validate(helper.makeParam('baz', true), {}, model);
      helper.validateError(ret, 11, ['boolean is required', 'byte is required', 'date is required', 'datetime is required', 'double is required', 'float is required', 'int32 is required', 'int64 is required', 'integer is required', 'number is required', 'string is required']);
    });
  });
});