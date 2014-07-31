# Validation for swagger-node-express

This is a module that follows the [swagger specification 1.2](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md) 
to offer validation on a particular request as it gets wired up through [swagger-node-express](https://github.com/wordnik/swagger-node-express).

## Installation

Using NPM, include the `swagger-validation` module in your `package.json` dependencies.

```json
{
	...
	"dependencies": {
		"swagger-validation": "~1.0",
		...
	}
	...
}
```

## Adding validation to swagger-node-express

There are few different ways to use this module within swagger-node-express depending on what you are trying to accomplish.

1. Use the middleware component of Swagger. The benefit of this is that, by default, all methods will have their request validated 
against the parameters specified automatically. 
**(NOTE: As of 7-31-2014, this is still a pull request of swagger and has not been approved. As such,
this implementation may change if / when it gets pulled into swagger-node-express).**
2. On each method inside swagger, call into one of the helper methods.
3. Modify swagger-node-express directly. While this would have the same benefit that, by default, all methods will have their 
request validated against the parameters specified automatically, this is a non-standard and will be an obsoleted approach once
the pull request specified above gets pulled in.

## Types of validation

| Type | Format | Description |
| ---- | ------ | ----- |
| `array` | | This checks that each value inside the array corresponds to the type that was specified. It doesn't check that the array contains 'empty' values, even if the array parameter is required as spec doesn't have a way to say all values inside the array are required. <br/><br/> While the spec says `uniqueItems` marks the array to be treated like a set instead of an array (and not that this is invalid if it isn't unique), it does have the potential to lead to an unintentional and unintended loss of data, so this throws a validation error that what you are passing isn't unique over just allowing the non-unique data to be lost. As such, if all the items passed their validation, check for uniqueness. This only validates uniqueness after all the items in the array are validated. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `boolean` | | This only handles native boolean types or converting from `true` / `false` strings, as the concept is not uniform for other types (ie, if it's a number, should it be 0 = false and 1 = true or should any non-zero number be true). However, this only handles strings that are the string representation in JavaScript of their boolean counterparts, so True, TRUE, etc. will not validate. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `integer` | | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hex value COULD be the hex representation of an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `integer` | `int32` | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hex value COULD be the hex representation of an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `integer` | `int64` | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `file` | | This has no type validation, but it is valid. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `number` | | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `number` | `float` | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `number` | `double` | This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hex value COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined this ensures the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined). <br/><br/> This does have issues with edge case validation (such as Number.MAX_VALUE + 1) as, per [IEEE-754 2008 §4.3.1 spec](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=4610935), JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE not Number.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `object` | | This checks that the value is a valid Object by iterating through each property on the associated model and calling out to the respective validation method to validate that property. After validating the properties on this object's model, it will recursively look to see if any other models have this model in their subType array. If so, it will validate those properties as well. It will continue to do this until no more types are found in the subType array. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | | If an enum is defined this ensures that the value is inside the enum list (which is case-sensitive). <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | `byte` | This has no type validation, but it is valid. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | `date` | This has no type validation, but it is valid. <br/><br/> There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time (more than likely due to the varied formats a date could have). Even using [moment.js](http://momentjs.com/) and something like [moment-parseformat](https://github.com/gr2m/moment.parseFormat) or the native Date object has the potential to lead to false positives. Without additional spec definition into what defines a date or date-time (or, ideally, the spec adds in a `format` for date / date time that can be used in a date validation function), this is too varied to be handled by the validation framework. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.
| `string` | `date-time` | This has no type validation, but it is valid. <br/><br/> There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time (more than likely due to the varied formats a date could have). Even using [moment.js](http://momentjs.com/) and something like [moment-parseformat](https://github.com/gr2m/moment.parseFormat) or the native Date object has the potential to lead to false positives. Without additional spec definition into what defines a date or date-time (or, ideally, the spec adds in a `format` for date / date time that can be used in a date validation function), this is too varied to be handled by the validation framework. <br/><br/> If "nothing" was passed into the validate function and it's required with no default value, then this will throw a parameter is required error.

## Documentation

Full documentation of how all code works in swagger-validation is available in both markdown and HTML format (using jsdoc) 
in the /docs sub-folder of this project.

## License

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