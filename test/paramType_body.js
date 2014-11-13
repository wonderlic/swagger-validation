'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');
var helper = require('./test_helper');

describe('paramType - body', function() {
  describe('with models', function() {
    it('should convert strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someModel',
            type: 'SomeModel',
            paramType: 'body'
          }
        ]
      };
      var models = {
        SomeModel: {
          id: 'SomeModel',
          properties: {
            someDate: {
              type: 'string',
              format: 'date'
            },
            someString: {
              type: 'string'
            }
          }
        }
      };
      var someDate = '2014-08-12';
      var someString = 'blah blah';
      var someDateTransformed = moment('2014-08-12').toDate();
      var req = {
        body: {
          someDate: someDate,
          someString: someString
        }
      };
      var ret = validate(spec, req, models);
      helper.validateSuccess(ret, 0);
      expect(req.body.someDate).to.eql(someDateTransformed);
      expect(req.body.someString).to.equal(someString);
    });

    it('should handle nested models when converting strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someModel',
            type: 'SomeModel',
            paramType: 'body'
          }
        ]
      };
      var models = {
        SomeModel: {
          id: 'SomeModel',
          properties: {
            someDate: {
              type: 'string',
              format: 'date'
            },
            nestedModel: {
              type: 'NestedModel'
            }
          }
        },
        NestedModel: {
          id: 'NestedModel',
          properties: {
            anotherDate: {
              type: 'string',
              format: 'date'
            }
          }
        }
      };
      var someDate = '2014-08-12';
      var someDateTransformed = moment('2014-08-12').toDate();
      var req = {
        body: {
          someDate: someDate,
          nestedModel: {
            anotherDate: someDate
          }
        }
      };
      var ret = validate(spec, req, models);
      helper.validateSuccess(ret, 0);
      expect(req.body.someDate).to.eql(someDateTransformed);
      expect(req.body.nestedModel.anotherDate).to.eql(someDateTransformed);
    });

    it('should return validation errors', function() {
      var spec = {
        parameters: [
          {
            name: 'someModel',
            type: 'SomeModel',
            paramType: 'body'
          }
        ]
      };
      var models = {
        SomeModel: {
          id: 'SomeModel',
          properties: {
            someDate: {
              type: 'string',
              format: 'date'
            },
            someString: {
              type: 'string'
            }
          }
        }
      };
      var req = {
        body: {
          someDate: 'not a real date',
          someString: 'blah blah'
        }
      };
      var ret = validate(spec, req, models);
      helper.validateError(ret, 1, ["someDate is not valid based on the pattern for moment.ISO 8601"]);
    });

    it('should not run validation tests', function() {
      var models = {
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

      var spec = {
        validation: {
          enabled: false
        },
        parameters: [
          {
            name: 'baz',
            type: 'baz',
            paramType: 'body'
          }
        ]
      };

      var req = {
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
      };
      var ret = validate(spec, req, models);
      helper.validateSuccess(ret, 0);
    });
  });

  describe('without models', function() {
    it('should validate spec and convert strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'body'
          }
        ]
      };
      var someDate = '2014-08-12';
      var someDateTransformed = moment('2014-08-12').toDate();
      var req = {
        body: someDate
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.body).to.eql(someDateTransformed);
    });

    it('should validate spec and not convert strings', function() {
      var spec = {
        validation: {
          replaceValues: false
        },
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'body'
          }
        ]
      };
      var someDate = '2014-08-12';
      var req = {
        body: someDate
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.body).to.eql(someDate);
    });
  });
});