'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');
var helper = require('./test_helper');

describe('paramType - query', function() {
  describe('without models', function() {
    it('should convert strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'query'
          },
          {
            name: 'someNumber',
            type: 'number',
            format: 'float',
            paramType: 'query'
          }
        ]
      };

      var someDate = '2014-08-12';
      var someNumber = '123.01';
      var someDateTransformed = moment('2014-08-12').toDate();
      var someNumberTransformed = 123.01;
      var req = {
        query: {
          someDate: someDate,
          someNumber: someNumber
        }
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.query.someDate).to.eql(someDateTransformed);
      expect(req.query.someNumber).to.equal(someNumberTransformed);
    });

    it('should convert strings to defaultValue', function() {
      var spec = {
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            defaultValue: '2014-11-23',
            paramType: 'query'
          },
          {
            name: 'someNumber',
            type: 'number',
            defaultValue: "233.2354",
            format: 'float',
            paramType: 'query'
          }
        ]
      };

      var req = {
        query: {}
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.query.someDate).to.eql("2014-11-23");
      expect(req.query.someNumber).to.equal("233.2354");
    });

    it('should not convert strings with date format to Date object', function() {
      var spec = {
        validation: {
          replaceValues: false
        },
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'query'
          },
          {
            name: 'someNumber',
            type: 'number',
            format: 'float',
            paramType: 'query'
          }
        ]
      };

      var someDate = '2014-08-12';
      var someNumber = '123.01';
      var req = {
        query: {
          someDate: someDate,
          someNumber: someNumber
        }
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.query.someDate).to.eql(someDate);
      expect(req.query.someNumber).to.equal(someNumber);
    });

    it('should return validation errors if string pattern does not match', function() {
      var spec = {
        parameters: [
          {
            name: 'someString',
            type: 'string',
            paramType: 'query',
            pattern: '/^hi/i'
          }
        ]
      };
      var req = {
        query: {
          someString: 'nothi'
        }
      };
      var ret = validate(spec, req);
      helper.validateError(ret, 1, ["someString is not valid based on the pattern /^hi/i"]);
    });
  });
});