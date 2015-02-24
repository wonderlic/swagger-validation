'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');
var helper = require('./test_helper');

describe('paramType - path', function() {
  describe('without models', function() {
    it('should convert strings', function() {
      var spec = {
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'path'
          },
          {
            name: 'someNumber',
            type: 'number',
            format: 'float',
            paramType: 'path'
          }
        ]
      };
      var someDate = '2014-08-12';
      var someNumber = '123.01';
      var someDateTransformed = moment('2014-08-12').toDate();
      var someNumberTransformed = 123.01;
      var req = {
        params: {
          someDate: someDate,
          someNumber: someNumber
        }
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.params.someDate).to.eql(someDateTransformed);
      expect(req.params.someNumber).to.equal(someNumberTransformed);
    });

    it('should not convert strings', function() {
      var spec = {
        validation: {
          replaceValues: false
        },
        parameters: [
          {
            name: 'someDate',
            type: 'string',
            format: 'date',
            paramType: 'path'
          },
          {
            name: 'someNumber',
            type: 'number',
            format: 'float',
            paramType: 'path'
          }
        ]
      };
      var someDate = '2014-08-12';
      var someNumber = '123.01';
      var req = {
        params: {
          someDate: someDate,
          someNumber: someNumber
        }
      };
      var ret = validate(spec, req);
      helper.validateSuccess(ret, 0);
      expect(req.params.someDate).to.eql(someDate);
      expect(req.params.someNumber).to.equal(someNumber);
    });
  });
});