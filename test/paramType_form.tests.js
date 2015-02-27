'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');
var helper = require('./test_helper');

describe('paramType - form', function() {
  describe('with models', function() {
    describe('should convert strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someModel',
            type: 'SomeModel',
            paramType: 'form'
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

      var obj = {
        someDate: someDate,
        someString: someString
      };

      var req = {
        form: {
          someModel: JSON.parse(JSON.stringify(obj))
        }
      };

      it("with request", function() {
        var ret = validate(spec, req, models);
        helper.validateSuccess(ret, 0);
        expect(req.form.someModel.someDate).to.eql(someDateTransformed);
        expect(req.form.someModel.someString).to.eql(someString);
      });

      it("without request", function() {
        var ret = validate(spec, obj, models);
        helper.validateSuccess(ret, 0);
        expect(obj.someDate).to.eql(someDateTransformed);
        expect(obj.someString).to.eql(someString);
      });

      it("without request & spec", function() {
        var ret = validate('SomeModel', obj, models);
        helper.validateSuccess(ret, 0);
        expect(obj.someDate).to.eql(someDateTransformed);
        expect(obj.someString).to.eql(someString);
      });
    });

    describe('should handle nested models when converting strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someModel',
            type: 'SomeModel',
            paramType: 'form'
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

      var obj = {
        someDate: someDate,
        nestedModel: {
          anotherDate: someDate
        }
      };

      var req = {
        form: {
          someModel: JSON.parse(JSON.stringify(obj))
        }
      };

      it("with request", function() {
        var ret = validate(spec, req, models);
        helper.validateSuccess(ret, 0);
        expect(req.form.someModel.someDate).to.eql(someDateTransformed);
        expect(req.form.someModel.nestedModel.anotherDate).to.eql(someDateTransformed);
      });

      it("without request", function() {
        var ret = validate(spec, obj, models);
        helper.validateSuccess(ret, 0);
        expect(obj.someDate).to.eql(someDateTransformed);
        expect(obj.nestedModel.anotherDate).to.eql(someDateTransformed);
      });

      it("without request & spec", function() {
        var ret = validate('SomeModel', obj, models);
        helper.validateSuccess(ret, 0);
        expect(obj.someDate).to.eql(someDateTransformed);
        expect(obj.nestedModel.anotherDate).to.eql(someDateTransformed);
      });
    });

    describe('should return validation errors', function() {
      var spec = {
        parameters: [
          {
            name: 'someModel',
            type: 'SomeModel',
            paramType: 'form'
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

      var obj = {
        someDate: 'not a real date',
        someString: 'blah blah'
      };

      var req = {
        form: {
          someModel: JSON.parse(JSON.stringify(obj))
        }
      };

      it("with request", function() {
        var ret = validate(spec, req, models);
        helper.validateError(ret, 1, ["someDate is not valid based on the pattern for moment.ISO 8601"]);
      });

      it("without request", function() {
        var ret = validate(spec, obj, models);
        helper.validateError(ret, 1, ["someDate is not valid based on the pattern for moment.ISO 8601"]);
      });

      it("without request & spec", function() {
        var ret = validate('SomeModel', obj, models);
        helper.validateError(ret, 1, ["someDate is not valid based on the pattern for moment.ISO 8601"]);
      });
    });

    describe('should not run validation tests', function() {
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
            paramType: 'form'
          }
        ]
      };

      var obj = {
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

      var req = {
        form: {
          baz: JSON.parse(JSON.stringify(obj))
        }
      };

      it("with request", function() {
        var ret = validate(spec, req, models);
        helper.validateSuccess(ret, 0);
      });

      it("without request", function() {
        var ret = validate(spec, req, models);
        helper.validateSuccess(ret, 0);
      });
    });
  });

  describe('without models', function() {
    describe('should validate spec and convert strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'form'
          }
        ]
      };
      var someDate = '2014-08-12';
      var someDateTransformed = moment('2014-08-12').toDate();

      var obj = someDate;

      var req = {
        form: {
          someDate: JSON.parse(JSON.stringify(obj))
        }
      };

      it("with request", function() {
        var ret = validate(spec, req);
        helper.validateSuccess(ret, 0);
        expect(req.form.someDate).to.eql(someDateTransformed);
      });

      it("without request", function() {
        var ret = validate(spec, obj);
        helper.validateSuccess(ret, 0);
        expect(obj).to.eql(someDate);
      });
    });

    describe('should validate spec and not convert strings', function() {
      var spec = {
        validation: {
          replaceValues: false
        },
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'form'
          }
        ]
      };
      var someDate = '2014-08-12';
      var obj = someDate;

      var req = {
        form: {
          someDate: JSON.parse(JSON.stringify(obj))
        }
      };

      it("with request", function() {
        var ret = validate(spec, req);
        helper.validateSuccess(ret, 0);
        expect(req.form.someDate).to.eql(someDate);
      });

      it("without request", function() {
        var ret = validate(spec, req);
        helper.validateSuccess(ret, 0);
        expect(obj).to.eql(someDate);
      });
    });
  });
});