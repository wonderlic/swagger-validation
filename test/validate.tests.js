'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var validate = require('../lib/validation/validate');
var helper = require('./test_helper');

describe('validate', function(){
  describe('body param', function(){
    describe('with models', function(){
      it('should convert strings with date format to Date object and add transformed value to req.body', function(){
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
      it('should handle nested models when converting strings with date format to Date object', function(){
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
      it('should return validation errors when req.body fails to validate', function(){
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
        helper.validateError(ret, 1, ["someDate is not a timestamp that can be parsed according to the expected pattern ISO 8601"]);
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
    });
  });
  describe('query param', function(){
    describe('with models', function(){
      it('should convert strings with date format to Date object and add transformed value to req.body', function(){
        var spec = {
          parameters: [
            {
              name: 'someModel',
              type: 'SomeModel',
              paramType: 'query'
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
          query: {
            someModel: {
              someDate: someDate,
              someString: someString
            }
          }
        };
        var ret = validate(spec, req, models);
        helper.validateSuccess(ret, 0);
        expect(req.query.someModel.someDate).to.eql(someDateTransformed);
        expect(req.query.someModel.someString).to.equal(someString);
      });
    });
    describe('without models', function(){
      it('should convert strings with date format to Date object', function(){
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
      it('should return validation errors if string pattern does not match', function(){
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
        helper.validateError(ret, 1, ["someString does not match the required pattern /^hi/i"]);
      });
    });
  });
  describe('path param', function(){
    describe('without models', function(){
      it('should convert strings with date format to Date object', function(){
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
    });
  });
});