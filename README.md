# Validation for Swagger for Express and Node.js

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

## Adding swagger-validation to swagger-node-express

There are few different ways to use this module within swagger-node-express depending on what you are trying to accomplish.

1. Use the middleware component of Swagger. The benefit of this is that, by default, all methods will have their request validated 
against the parameters specified automatically. 
**(NOTE: As of 7-31-2014, this is still a pull request of swagger and has not been approved. As such,
this implementation may change if / when it gets pulled into swagger-node-express).**
2. On each method inside swagger, call into one of the helper methods.
3. Modify swagger-node-express directly. While this would have the same benefit that, by default, all methods will have their 
request validated against the parameters specified automatically, this is a non-standard and will be an obsoleted approach once
the pull request specified above gets pulled in.

## Types of validation / Limitations
| Type | Format | Notes |
| 'boolean' | | > This only handles native boolean types or converting from 'true' / 'false' strings, as the concept is not 
                > uniform for other types (ie, if it's a number, should it be 0 = false and 1 = true or should any non-zero number be true). 
                > However, this only handles strings that are the string representation in JavaScript of their boolean counterparts, 
                > so True, TRUE, etc. will not validate.                 
                >
                > If "nothing" was passed into the validate function and it's required with no default value,
                > then this will throw a parameter is required error.
| 'integer' | | 
| 'integer' | 'int32' | 
| 'integer' | 'int64' | 
| 'number' | | 
| 'number' | 'float' | 
| 'number' | 'double' | 
| 'string' | | 
| 'string' | 'byte' | 
| 'string' | 'date' | 
| 'string' | 'date-time' | 


## Documentation

Full documentation of how all code works in swagger-validation is available in both markdown and HTML format (using jsdoc) 
in the /docs sub-folder of this project.

