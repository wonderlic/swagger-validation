'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');

describe('validate', function(){
  describe('with models', function() {
    it('should validate spec with body parameter, convert strings with date format to Date object, and add to req.body', function(){
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
          someDate: '2014-08-12',
          someString: 'blah blah'
        }
      };
      var expected = moment('2014-08-12').toDate();
      var result = validate(spec, req, models);
      expect(result).to.be.empty;
      expect(req.body.someDate).to.eql(expected);
      expect(req.body.someString).to.equal('blah blah');
    });
  });
  describe('without models', function(){
    it('should validate spec and convert strings with date format to Date object for query parameter', function(){
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
            paramType: 'query'
          }
        ]
      };
      var req = {
        query: {
          someDate: '2014-08-12',
          someNumber: '123.0'
        }
      };
      var expected = moment('2014-08-12').toDate();
      var result = validate(spec, req, []);
      expect(result).to.be.empty;
      expect(req.query.someDate).to.eql(expected);
      expect(req.query.someNumber).to.equal(123.0);
    });
  });
  
});