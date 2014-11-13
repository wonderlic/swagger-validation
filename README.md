# Validation for swagger-node-express

[![Build Status](https://img.shields.io/travis/wonderlic/swagger-validation/master.svg)](https://travis-ci.org/wonderlic/swagger-validation)
[![NPM version](https://badge.fury.io/js/swagger-validation.svg)](http://badge.fury.io/js/swagger-validation)
[![Dependency Status](https://david-dm.org/wonderlic/swagger-validation.png)](https://david-dm.org/wonderlic/swagger-validation.png)

## Quick Description

This module validates a request from a swagger-node-express application using the existing swagger-node-express objects,
parameters, and models following the [swagger specification 1.2](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md). 
It returns an array of JavaScript Error objects if there are any validation errors. For now,
it only uses the message property of the Error object which, using lo-dash or Underscore.js, can be got easily via 

```javascript
var errors = _.pluck(_.pluck([VALIDATION RETURN], 'error'), 'message');)
```

## Installation

Using NPM, include the `swagger-validation` module in your `package.json` dependencies.

```json
{
	...
	"dependencies": {
		"swagger-validation": "~1.2",
		...
	}
	...
}
```

## Adding validation to swagger-node-express

There are few different ways to use this module within swagger-node-express depending on what you are trying to accomplish.

### Use the middleware component of Swagger 

The benefit of this is that, by default, all methods will have their request validated 
against the parameters specified automatically. 

```javascript

// add this to the swagger definition, usually defined in the app.js
swagger.addMiddleware(function(req, res, spec, models) {
  var ret = validate(spec, req, models);
  if(ret.length) {
    var errors = _.pluck(_.pluck(ret, 'error'), 'message');
    var message = 'validation failure - ' + errors.join();
    return { 'code' : 400, 'message': message };
  }
});

```

**(NOTE: As of 8-7-2014, this is still a pull request of swagger and has not been approved. As such,
this implementation WILL change if / when it gets pulled into swagger-node-express).**

### Validate each method individually 

For the following method (using the swagger-application "test application" inside swagger-node-express)

```javascript
exports.findById = {
  'spec': {
    description : "Operations about pets",  
    path : "/pet/{petId}",
    method: "GET",
    summary : "Find pet by ID",
    notes : "Returns a pet based on ID",
    type : "Pet",
    nickname : "getPetById",
    produces : ["application/json"],
    parameters : [param.path("petId", "ID of pet that needs to be fetched", "string")],
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]
  },
  'action': function (req,res) {
    if (!req.params.petId) {
      throw swe.invalid('id'); }
    var id = parseInt(req.params.petId);
    var pet = petData.getPetById(id);

    if(pet) res.send(JSON.stringify(pet));
    else throw swe.notFound('pet',res);
  }
};
```

change it to 

```javascript
exports.findById = {
  'spec': {
    description : "Operations about pets",  
    path : "/pet/{petId}",
    method: "GET",
    summary : "Find pet by ID",
    notes : "Returns a pet based on ID",
    type : "Pet",
    nickname : "getPetById",
    produces : ["application/json"],
    parameters : [param.path("petId", "ID of pet that needs to be fetched", "string")],
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]
  },
  'action': function (req,res) {
    
    var validate = require('swagger-validation');
    var models = require("./models.js");
    var _ = require('lodash');
    // models are only needed if this is intended to validate an object
    var ret = validate(exports.findById.spec, req, models); 
    if(ret.length) {
      var errors = _.pluck(_.pluck(ret, 'error'), 'message');
      res.send(JSON.stringify({
        'message': 'validation failure - ' + errors.join(),
        'code': 400
      }), 400);
      return;
    }
  
    if (!req.params.petId) {
      throw swe.invalid('id'); }
    var id = parseInt(req.params.petId);
    var pet = petData.getPetById(id);

    if(pet) res.send(JSON.stringify(pet));
    else throw swe.notFound('pet',res);
  }
};
```

or, for a little cleaner approach:

```javascript
exports.findById = {
  'spec': {
    description : "Operations about pets",
    path : "/pet/{petId}",
    method: "GET",
    summary : "Find pet by ID",
    notes : "Returns a pet based on ID",
    type : "Pet",
    nickname : "getPetById",
    produces : ["application/json"],
    parameters : [param.path("petId", "ID of pet that needs to be fetched", "string")],
    responseMessages : [swe.invalid('id'), swe.notFound('pet')]
  },
  'action': function (req,res) {
    validateReq(req, res, exports.findById.spec, function() {
      if (!req.params.petId) {
        throw swe.invalid('id'); }
      var id = parseInt(req.params.petId);
      var pet = petData.getPetById(id);

      if(pet) res.send(JSON.stringify(pet));
      else throw swe.notFound('pet',res);
    });
  }
};

// put this somewhere else, either in the same file or put it in a 
// separate module using the standard module.exports Node convention
var validate = require('swagger-validation');
var _ = require('lodash');
var models = require("./models.js");

function validateReq(req, res, spec, func) {
  var ret = validate(spec, req, models);
  if(ret.length) {
    var errors = _.pluck(_.pluck(ret, 'error'), 'message');
    res.send(JSON.stringify({
      'message': 'validation failure - ' + errors.join(),
      'code': 400
    }), 400);
    return;
  }

  func();
}

```

### Modify swagger-node-express directly

While this would have the same benefit as the first one that, by default, all methods 
will have their request validated against the parameters specified automatically, this is **non-standard** and **can lead to unintended consequences**. 
This **will** be deprecated / removed once the pull request specified above gets pulled in.

```javascript

    // /swagger-node-express/lib/swagger.js
    // lines 418 - 420 currently have
    else {
      callback(req, res, next);
    }

    // change it to 
    else {
      var validate = require('swagger-validation');
      var ret = validate(spec, req, self.allModels);
      if(ret.length) {
        var errors = _.pluck(_.pluck(ret, 'error'), 'message');
        res.send(JSON.stringify({
          'message': 'validation failure - ' + errors.join(),
          'code': 400
        }), 400);
        return;
      }
    
      callback(req, res, next);
    }
        
```

## Functionality outside of Swagger specification

swagger-validation adheres to the official swagger specification, but does provide non-specification defined
functionality to allow additional validation / ease that the swagger specification doesn't support.

### String pattern matching (RegExp)

It is possible to validate string types using a RegExp pattern defined on your swagger object. For the following example:

```javascript
exports.findByName = {
  spec: {
    description : "Find pet by name",  
    path : "/pet/{petName}",
    method: "GET",
    type : "Pet",
    produces : ["application/json"],
    parameters : [{
      id: "petName",
      description: "petName",
      type: "string",
      pattern: "^dr*"
    }]
  }
};
```

swagger-validation will now enforce that all names sent to the /pet/{petName} route start with `"dr"`.
`pattern` will accept any regex string.  An invalid regex string will report an error.

### Date pattern matching (moment.js format)

Much like the string pattern matching mentioned above, swagger objects with a type of `string` and a format of `date` or `date-time` 
also accept a `pattern` property. However, instead of a RegExp string, they accept a [moment.js format string](http://momentjs.com/docs/#/displaying/format/).
By default, it uses `moment.ISO_8601()`, which should match any ISO 8601 compatible date.
If you want to be more explicit, you can specify your own format using the `pattern` property.

### Value manipulation

In addition to validating the req, it will replace the value on the req according to the following chart:

| Input Type | Swagger Type | Swagger Format | Output | 
| ----- | ----- | ----- | ----- |
| string integer/long e.g. `"123"` | `integer` | `int32` or `int64` | integer/long e.g. `123` |
| string hex e.g. `"0x123"` | `integer` | `int32` or `int64` | integer/long e.g. `291` |
| string float/double e.g. `"123.01"` | `number` | `float` or `double`| float/double e.g. `123.01` |
| string boolean e.g. `"true"` | `boolean` | | boolean e.g. `true` |
| string date e.g. `"2014-08-10"` | `string` | `date` | Date object e.g. `new Date("2014-08-10")`** |
| string date e.g. `"2014-08-10T12:00:01"` | `string` | `date-time` | Date object e.g. `new Date("2014-08-10T12:00:01")`** |

** The date conversions are done using the [moment.js](//momentjs.com/) library. 
By default, it uses the `moment.ISO_8601()` format for parsing dates, but can be overridden by changing the `pattern` property

In addition, if a defaultValue is specified for the param and the value is null, undefined, or an empty string, swagger-validation 
will replace the value on the req with the defaultValue for that parameter.

### Validation object

Swagger-validation also adds another object to the swagger.spec definition called validation that looks like this

```javascript
validation = {
  enabled : [true / false],
  replaceValues : [true / false]
};
```

and can be used like 

```javascript
exports.findByName = {
  spec: {
    description : "Find pet by name",  
    path : "/pet/{petName}",
    method: "GET",
    type : "Pet",
    validation = {
      replaceValues : false
    },
    produces : ["application/json"],
    parameters : [{
      id: "petName",
      description: "petName",
      type: "string",
      pattern: "/^dr*/i"
    }]
  }
};
```

The `enabled` property turns on / off swagger-validation holistically for the particular spec. <br/>
The `replaceValues` property turns on / off the functionality to manipulate values on the req (detailed in the previous section). <br/>
Both of these values default to true (so validation is enabled as well as it will replace the values on the req).

## Types of validation

| Type | Format | Description |
| ----- | ------ | ----- |
| `array` | | This checks that each value inside the array corresponds to the type that was specified. It doesn't check that the array contains 'empty' values, even if the array parameter is required as spec doesn't have a way to say all values inside the array are required. <br/><br/> While the spec says `uniqueItems` marks the array to be treated like a set instead of an array (and not that this is invalid if it isn't unique), it does have the potential to lead to an unintentional and unintended loss of data, so this throws a validation error that what you are passing isn't unique over just allowing the non-unique data to be lost. As such, if all the items passed their validation, check for uniqueness. This only validates uniqueness after all the items in the array are validated. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `boolean` | | This only handles native boolean types or converting from `true` / `false` strings, as the concept is not uniform for other types (ie, if it's a number, should it be 0 = false and 1 = true or should any non-zero number be true). However, this only handles strings that are the string representation in JavaScript of their boolean counterparts, so True, TRUE, etc. will not validate. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `integer` | | This allows all forms of a number (so 2, 2.0, 2e0, 0x2). As a hex value COULD be the hex representation of an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `integer` | `int32` | This allows all forms of a number (so 2, 2.0, 2e0, 0x2) and allows numbers between -9007199254740991 and +9007199254740991 (both inclusive). As a hex value COULD be the hex representation of an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `integer` | `int64` | This allows all forms of a number (so 2, 2.0, 2e0, 0x2) and allows numbers between `Number.MIN_VALUE` (exclusive) and `Number.MAX_VALUE` (inclusive). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `file` | | This has no type validation, but it is valid. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `number` | | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2) and allows numbers between `Number.MIN_VALUE` and `Number.MAX_VALUE` (both inclusive). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `number` | `float` | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2) and allows numbers between `Number.MIN_VALUE` and `Number.MAX_VALUE` (both inclusive). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `number` | `double` | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2) and allows numbers between `Number.MIN_VALUE` and `Number.MAX_VALUE` (both inclusive). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `object` | | This checks that the value is a valid Object by iterating through each property on the associated model and calling out to the respective validation method to validate that property. After validating the properties on this object's model, it will recursively look to see if any other models have this model in their subType array. If so, it will validate those properties as well. It will continue to do this until no more types are found in the subType array. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | | If an enum is defined this ensures that the value is inside the enum list (which is case-sensitive). <br/><br/>If a pattern is defined this also ensures that the value adheres to it.<br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | `byte` | This has no type validation, but it is valid. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | `date` | There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time (more than likely due to the varied formats a date could have). Therefore, swagger-validation will accept a 'pattern' property on the Swagger Property/Parameter Objects, which is a moment.js format string, that specifies the explicit format expected for the date format. If no pattern property is detected, moment.ISO_8601 will be used by default. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | `date-time` | There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time (more than likely due to the varied formats a date could have). Therefore, swagger-validation will accept a 'pattern' property on the Swagger Property/Parameter Objects, which is a moment.js format string, that specifies the explicit format expected for the date format. If no pattern property is detected, moment.ISO_8601 will be used by default. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.

## Documentation

Full documentation of how all code works in swagger-validation is available in both markdown and HTML format (using jsdoc) 
in the /docs sub-folder of this project.

## License

(The MIT License)

Copyright (c) 2014 Wonderlic, Inc. <SoftwareDevelopment@wonderlic.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.