'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');
var helper = require('./test_helper');

describe('paramType - form', function() {
  describe('with models', function() {
    it('should convert strings', function() {
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
      var req = {
        form: {
          someModel: {
            someDate: someDate,
            someString: someString
          }
        }
      };
      var ret = validate(spec, req, models);
      helper.validateSuccess(ret, 0);
      expect(req.form.someModel.someDate).to.eql(someDateTransformed);
      expect(req.form.someModel.someString).to.equal(someString);
    });

    it('should handle nested models when converting strings', function() {
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
      var req = {
        form: {
          someModel: {
            someDate: someDate,
            nestedModel: {
              anotherDate: someDate
            }
          }
        }
      };

      var ret = validate(spec, req, models);
      helper.validateSuccess(ret, 0);
      expect(req.form.someModel.someDate).to.eql(someDateTransformed);
      expect(req.form.someModel.nestedModel.anotherDate).to.eql(someDateTransformed);
    });

    it('should return validation errors', function() {
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
      var req = {
        form: {
          someModel: {
            someDate: 'not a real date',
            someString: 'blah blah'
          }
        }
      };
      var ret = validate(spec, req, models);
      helper.validateError(ret, 1, ["someDate is not valid based on the pattern for moment.ISO 8601"]);
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
            paramType: 'form'
          }
        ]
      };
      var someDate = '2014-08-12';
      var someDateTransformed = moment('2014-08-12').toDate();
      var req = {
        form: {
          someDate: someDate
        }
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.form.someDate).to.eql(someDateTransformed);
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
            paramType: 'form'
          }
        ]
      };
      var someDate = '2014-08-12';
      var req = {
        form: {
          someDate: someDate
        }
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.form.someDate).to.eql(someDate);
    });
  });
});