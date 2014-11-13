#Index

**Namespaces**

* [Polyfills](#Polyfills)
  * [Polyfills.isInteger(nVal)](#Polyfills.isInteger)
  * [Polyfills.isInt64(nVal)](#Polyfills.isInt64)
* [Validation](#Validation)
  * [Validation.Validate_ParamType(param, req, [models], validationObj)](#Validation.Validate_ParamType)
  * [Validation.Validate_Parameter(param, value, [models])](#Validation.Validate_Parameter)
  * [Validation.Validate(spec, req, [models])](#Validation.Validate)
  * [Validation.ParamTypes](#Validation.ParamTypes)
    * [ParamTypes.Make_Validation_Object([validation])](#Validation.ParamTypes.Make_Validation_Object)
    * [ParamTypes.Validate_Body(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Body)
    * [ParamTypes.Validate_Form(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Form)
    * [ParamTypes.Validate_Header(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Header)
    * [ParamTypes.Validate_ParamType(param, ret)](#Validation.ParamTypes.Validate_ParamType)
    * [ParamTypes.Validate_ParamType(param, value, [models], [allowMultiple])](#Validation.ParamTypes.Validate_ParamType)
    * [ParamTypes.Validate_Header(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Header)
    * [ParamTypes.Validate_Query(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Query)
  * [Validation.Parameters](#Validation.Parameters)
    * [Parameters.Validate_Array(param, value, [models])](#Validation.Parameters.Validate_Array)
    * [Parameters.Validate_Boolean(param, value)](#Validation.Parameters.Validate_Boolean)
    * [Parameters.Validate_Byte(param, value)](#Validation.Parameters.Validate_Byte)
    * [Parameters.Validate_Date(param, value)](#Validation.Parameters.Validate_Date)
    * [Parameters.Validate_Datetime(param, value)](#Validation.Parameters.Validate_Datetime)
    * [Parameters.Validate_File(param, value)](#Validation.Parameters.Validate_File)
    * [Parameters.Return_Error(err, [errArgs])](#Validation.Parameters.Return_Error)
    * [Parameters.Return_Success(val)](#Validation.Parameters.Return_Success)
    * [Parameters.Is_Required(param, value)](#Validation.Parameters.Is_Required)
    * [Parameters.Validate_Int64(param, value)](#Validation.Parameters.Validate_Int64)
    * [Parameters.Validate_Integer(param, value)](#Validation.Parameters.Validate_Integer)
    * [Parameters.Validate_Integer_Formats(param, value)](#Validation.Parameters.Validate_Integer_Formats)
    * [Parameters.Validate_Number(param, value)](#Validation.Parameters.Validate_Number)
    * [Parameters.Validate_Number_Formats(param, value)](#Validation.Parameters.Validate_Number_Formats)
    * [Parameters.Validate_Object(param, value, models)](#Validation.Parameters.Validate_Object)
    * [Parameters.Validate_Object_Formats(param, value, models)](#Validation.Parameters.Validate_Object_Formats)
    * [Parameters.Validate_String(param, value)](#Validation.Parameters.Validate_String)
    * [Parameters.Validate_String_Formats(param, value)](#Validation.Parameters.Validate_String_Formats)
 
<a name="Polyfills"></a>
#Polyfills
**Members**

* [Polyfills](#Polyfills)
  * [Polyfills.isInteger(nVal)](#Polyfills.isInteger)
  * [Polyfills.isInt64(nVal)](#Polyfills.isInt64)

<a name="Polyfills.isInteger"></a>
##Polyfills.isInteger(nVal)
This is a polyfill for checking if something is an integer. This is proposed functionality in ECMA6 (aka Harmony). <br/>[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill)

**Params**

- nVal `Object` - The value to be checked  

**Returns**: `Boolean` - True if <tt>nVal</tt> can successfully be parsed as an Integer, else false.  
<a name="Polyfills.isInt64"></a>
##Polyfills.isInt64(nVal)
This is a polyfill for checking if something is an int64.

**Params**

- nVal `Object` - The value to be checked  

**Returns**: `Boolean` - True if <tt>nVal</tt> can successfully be parsed as an int64, else false.  
<a name="Validation"></a>
#Validation
**Members**

* [Validation](#Validation)
  * [Validation.Validate_ParamType(param, req, [models], validationObj)](#Validation.Validate_ParamType)
  * [Validation.Validate_Parameter(param, value, [models])](#Validation.Validate_Parameter)
  * [Validation.Validate(spec, req, [models])](#Validation.Validate)
  * [Validation.ParamTypes](#Validation.ParamTypes)
    * [ParamTypes.Make_Validation_Object([validation])](#Validation.ParamTypes.Make_Validation_Object)
    * [ParamTypes.Validate_Body(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Body)
    * [ParamTypes.Validate_Form(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Form)
    * [ParamTypes.Validate_Header(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Header)
    * [ParamTypes.Validate_ParamType(param, ret)](#Validation.ParamTypes.Validate_ParamType)
    * [ParamTypes.Validate_ParamType(param, value, [models], [allowMultiple])](#Validation.ParamTypes.Validate_ParamType)
    * [ParamTypes.Validate_Header(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Header)
    * [ParamTypes.Validate_Query(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Query)
  * [Validation.Parameters](#Validation.Parameters)
    * [Parameters.Validate_Array(param, value, [models])](#Validation.Parameters.Validate_Array)
    * [Parameters.Validate_Boolean(param, value)](#Validation.Parameters.Validate_Boolean)
    * [Parameters.Validate_Byte(param, value)](#Validation.Parameters.Validate_Byte)
    * [Parameters.Validate_Date(param, value)](#Validation.Parameters.Validate_Date)
    * [Parameters.Validate_Datetime(param, value)](#Validation.Parameters.Validate_Datetime)
    * [Parameters.Validate_File(param, value)](#Validation.Parameters.Validate_File)
    * [Parameters.Return_Error(err, [errArgs])](#Validation.Parameters.Return_Error)
    * [Parameters.Return_Success(val)](#Validation.Parameters.Return_Success)
    * [Parameters.Is_Required(param, value)](#Validation.Parameters.Is_Required)
    * [Parameters.Validate_Int64(param, value)](#Validation.Parameters.Validate_Int64)
    * [Parameters.Validate_Integer(param, value)](#Validation.Parameters.Validate_Integer)
    * [Parameters.Validate_Integer_Formats(param, value)](#Validation.Parameters.Validate_Integer_Formats)
    * [Parameters.Validate_Number(param, value)](#Validation.Parameters.Validate_Number)
    * [Parameters.Validate_Number_Formats(param, value)](#Validation.Parameters.Validate_Number_Formats)
    * [Parameters.Validate_Object(param, value, models)](#Validation.Parameters.Validate_Object)
    * [Parameters.Validate_Object_Formats(param, value, models)](#Validation.Parameters.Validate_Object_Formats)
    * [Parameters.Validate_String(param, value)](#Validation.Parameters.Validate_String)
    * [Parameters.Validate_String_Formats(param, value)](#Validation.Parameters.Validate_String_Formats)

<a name="Validation.Validate_ParamType"></a>
##Validation.Validate_ParamType(param, req, [models], validationObj)
Ensures that the <tt>req</tt> that is passed in on the req is valid based upon the Swagger definition for this operation.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- req `Object` - The request that this is validating  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- validationObj `Object` - The validation object that is defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.Validate_Parameter"></a>
##Validation.Validate_Parameter(param, value, [models])
Ensures that the <tt>value</tt> that is passed in on the req is valid based upon the Swagger definition for this operation.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.Validate"></a>
##Validation.Validate(spec, req, [models])
Validates the <tt>req</tt> against the <tt>spec</tt> that was defined.

**Params**

- spec `Object` - The specification that this is validating  
- req `Object` - The request that this is validating. Any date/date-time values specified in the specwill be automatically converted to Date objects if they pass validation.  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  

**Returns**: `Array` - An empty array if there were no validation errors or an array of objects with error propertiesif there are one or more validation errors.  
<a name="Validation.ParamTypes"></a>
##Validation.ParamTypes
**Members**

* [Validation.ParamTypes](#Validation.ParamTypes)
  * [ParamTypes.Make_Validation_Object([validation])](#Validation.ParamTypes.Make_Validation_Object)
  * [ParamTypes.Validate_Body(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Body)
  * [ParamTypes.Validate_Form(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Form)
  * [ParamTypes.Validate_Header(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Header)
  * [ParamTypes.Validate_ParamType(param, ret)](#Validation.ParamTypes.Validate_ParamType)
  * [ParamTypes.Validate_ParamType(param, value, [models], [allowMultiple])](#Validation.ParamTypes.Validate_ParamType)
  * [ParamTypes.Validate_Header(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Header)
  * [ParamTypes.Validate_Query(param, req, [models], validationObj)](#Validation.ParamTypes.Validate_Query)

<a name="Validation.ParamTypes.Make_Validation_Object"></a>
###ParamTypes.Make_Validation_Object([validation])
Ensures that that the validation object on the <tt>spec</tt> is complete with all defaults configured.

**Params**

- \[validation\] `Object` - Optionally, the validation object that is defined as part of this Swagger API definition  

**Returns**: `Object` - An object that contains the values passed in on <tt>spec.validation</tt>,plus any defaults for missing values  
<a name="Validation.ParamTypes.Validate_Body"></a>
###ParamTypes.Validate_Body(param, req, [models], validationObj)
Validates the body of the <tt>req</tt> that called validation.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- req `Object` - The request that this is validating  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- validationObj `Object` - The validation object that is defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.ParamTypes.Validate_Form"></a>
###ParamTypes.Validate_Form(param, req, [models], validationObj)
Validates the form of the <tt>req</tt> that called validation.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- req `Object` - The request that this is validating  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- validationObj `Object` - The validation object that is defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.ParamTypes.Validate_Header"></a>
###ParamTypes.Validate_Header(param, req, [models], validationObj)
Validates the header of the <tt>req</tt> that called validation. Additionally, this will honorthe allowMultiple flag.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- req `Object` - The request that this is validating  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- validationObj `Object` - The validation object that is defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.ParamTypes.Validate_ParamType"></a>
###ParamTypes.Validate_ParamType(param, ret)
Gets the value to be passed back in the req if <tt>spec.validation.replaceValues === true</tt>.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- ret `Object` - The value that was returned from the paramType and parameter validation  

**Returns**: `Object` - The values that was returned from the paramType and parameter validation,else the defaultValue if specified, else undefined.  
<a name="Validation.ParamTypes.Validate_ParamType"></a>
###ParamTypes.Validate_ParamType(param, value, [models], [allowMultiple])
Validates the form of the <tt>req</tt> that called validation.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that was passed to be validated  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- \[allowMultiple=false\] `Boolean` - True if this <tt>param</tt> allowed multiple and the param type allows multiple, else false  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.ParamTypes.Validate_Header"></a>
###ParamTypes.Validate_Header(param, req, [models], validationObj)
Validates the path of the <tt>req</tt> that called validation. Additionally, this will honorthe allowMultiple flag.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- req `Object` - The request that this is validating  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- validationObj `Object` - The validation object that is defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.ParamTypes.Validate_Query"></a>
###ParamTypes.Validate_Query(param, req, [models], validationObj)
Validates the query string of the <tt>req</tt> that called validation. Additionally, this will honorthe allowMultiple flag.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- req `Object` - The request that this is validating  
- \[models\] `Object` - Optionally, the models that are defined as part of this Swagger API definition  
- validationObj `Object` - The validation object that is defined as part of this Swagger API definition  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value, parsed successfully if validation knows how, else the value unmodified.  
<a name="Validation.Parameters"></a>
##Validation.Parameters
**Members**

* [Validation.Parameters](#Validation.Parameters)
  * [Parameters.Validate_Array(param, value, [models])](#Validation.Parameters.Validate_Array)
  * [Parameters.Validate_Boolean(param, value)](#Validation.Parameters.Validate_Boolean)
  * [Parameters.Validate_Byte(param, value)](#Validation.Parameters.Validate_Byte)
  * [Parameters.Validate_Date(param, value)](#Validation.Parameters.Validate_Date)
  * [Parameters.Validate_Datetime(param, value)](#Validation.Parameters.Validate_Datetime)
  * [Parameters.Validate_File(param, value)](#Validation.Parameters.Validate_File)
  * [Parameters.Return_Error(err, [errArgs])](#Validation.Parameters.Return_Error)
  * [Parameters.Return_Success(val)](#Validation.Parameters.Return_Success)
  * [Parameters.Is_Required(param, value)](#Validation.Parameters.Is_Required)
  * [Parameters.Validate_Int64(param, value)](#Validation.Parameters.Validate_Int64)
  * [Parameters.Validate_Integer(param, value)](#Validation.Parameters.Validate_Integer)
  * [Parameters.Validate_Integer_Formats(param, value)](#Validation.Parameters.Validate_Integer_Formats)
  * [Parameters.Validate_Number(param, value)](#Validation.Parameters.Validate_Number)
  * [Parameters.Validate_Number_Formats(param, value)](#Validation.Parameters.Validate_Number_Formats)
  * [Parameters.Validate_Object(param, value, models)](#Validation.Parameters.Validate_Object)
  * [Parameters.Validate_Object_Formats(param, value, models)](#Validation.Parameters.Validate_Object_Formats)
  * [Parameters.Validate_String(param, value)](#Validation.Parameters.Validate_String)
  * [Parameters.Validate_String_Formats(param, value)](#Validation.Parameters.Validate_String_Formats)

<a name="Validation.Parameters.Validate_Array"></a>
###Parameters.Validate_Array(param, value, [models])
Ensures that the <tt>value</tt> that is passed in is a valid Array as well as checking that eachvalue inside the array corresponds to the type that was specified in the <tt>param</tt> definition.It doesn't check that the array contains 'empty' values, even if the array parameter is required asspec doesn't have a way to say all values inside the array are required.While the spec says <tt>param.uniqueItems</tt> marks the array to be treated like a set instead of an array(and not that this is invalid if it isn't unique), it does have the potential to lead to anunintentional and unintended loss of data, so this throws a validation error that what you are passing isn't uniqueover just allowing the non-unique data to be lost. If all the items passed their validation, check for uniqueness.This only validates uniqueness after all the items in the array are validated. This allows all the individualparameter methods to convert the value as they see fit so we are comparing apples to apples(so '1' will get converted correctly to 1, etc.).If <tt>param.uniqueItems</tt> is checked, this doesn't use either the native Set (as that is part of the Harmony(ECMAScript 6) proposal, [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set))or a polyfill to "fill" in the missing functionality (something like [https://github.com/jfriend00/ES6-Set](https://github.com/jfriend00/ES6-Set)).This strictly converts everything to strings (using JSON.stringify()) and allows the _.uniq() method to compare strings.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  
- \[models\] `Object` - Any models that are defined for this API  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Boolean"></a>
###Parameters.Validate_Boolean(param, value)
Ensures that the <tt>value</tt> that is passed in is a valid boolean. This only handles native boolean types orconverting from 'true' / 'false' strings, as the concept is not uniform for other types (ie, if it's a number,should it be 0 = false and 1 = true or should any non-zero number be true). However, this only handles stringsthat are the string representation in JavaScript of their boolean counterparts, so True, TRUE, etc. will not validate.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Byte"></a>
###Parameters.Validate_Byte(param, value)
There is no validation to be done for this type, but it is valid.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value passed in unmodified.  
<a name="Validation.Parameters.Validate_Date"></a>
###Parameters.Validate_Date(param, value)
There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time(more than likely due to the varied formats a date could have). Therefore, swagger-validation will accept a'pattern' property on the Swagger Property/Parameter Objects, which is a moment.js format stringthat specifies the explicit format expected for the date format. If no pattern property is detected,moment.ISO_8601 will be used by default.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains a Date object parsed from <tt>value</tt>. Since the date formatis meant to ignore time, the time will be automatically removed from the returned value.If the time is needed, use the parameter "date-time" instead.  
<a name="Validation.Parameters.Validate_Datetime"></a>
###Parameters.Validate_Datetime(param, value)
There is no definitive definition in the swagger spec as to what constitutes a valid date or date-time(more than likely due to the varied formats a date could have). Therefore, swagger-validation will accept a'pattern' property on the Swagger Property/Parameter Objects, which is a moment.js format string,that specifies the explicit format expected for the date-time format. If no pattern property is detected,moment.ISO_8601 will be used by default.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains a Date object parsed from <tt>value</tt>.  
<a name="Validation.Parameters.Validate_File"></a>
###Parameters.Validate_File(param, value)
There is no validation to be done for this type, but it is valid.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req via a form  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value passed in unmodified.  
<a name="Validation.Parameters.Return_Error"></a>
###Parameters.Return_Error(err, [errArgs])
Used by the [Parameters](#Validation.Parameters) to indicate that a particular <tt>value</tt> did not pass validation.Everything returns an array as object and arrays can have multiple error messages returned.This uses the Error class in case any additional property of an Error is needed at a later point.

**Params**

- err `string` - The error message to get returned. If <tt>errArgs</tt> is provided, then this will call util.format().  
- \[errArgs\] `string` | `Array` - Optionally, the args to get passed to util.format().  

**Returns**: `Array` - An array containing an object with an error property (which contains an Array of Error objects)  
<a name="Validation.Parameters.Return_Success"></a>
###Parameters.Return_Success(val)
Used by the [Parameters](#Validation.Parameters) to indicate that a particular <tt>value</tt> passed validation.Everything returns an array as object and arrays can have multiple messages returned.

**Params**

- val `Object` - The successfully parsed and validated value.  

**Returns**: `Array` - An array containing an object with a value property that contains the value parsed successfully. This is done asan array can validate uniqueness (but it let's each individual validation method handle it's own conversion so as not to duplicate effort).  
<a name="Validation.Parameters.Is_Required"></a>
###Parameters.Is_Required(param, value)
Used by the [Parameters](#Validation.Parameters) to determine whether or not a particular <tt>value</tt> is required and not present.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - If <tt>value</tt> is required, is undefined, null, or an empty string, and there is no defaultValue, this will return theresult of [Return_Error](#Validation.Parameters.Return_Error). If there is a defaultValue, this will return an empty array, which indicatesthat the defaultValue will be used, which is not validated. If <tt>value</tt> is not undefined, null, or an empty string,this will return undefined indicating that further validation is required.  
<a name="Validation.Parameters.Validate_Int64"></a>
###Parameters.Validate_Int64(param, value)
Ensures that the <tt>value</tt> that is passed in is a valid integer with a format of int64.This allows all forms of a number (so 2, 2.0, 2e0, 0x2). As a hex value COULD be the hex representationof an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in theway it wants to. Additionally, if a minimum or maximum is defined for this <tt>param</tt> ensure that thevalue is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined).This allows numbers between <tt>Number.MIN_VALUE</tt> (exclusive) and <tt>Number.MAX_VALUE</tt> (inclusive).This does have issues with edge cases, however, (such as Number.MAX_VALUE + 1) as, per IEEE-754 2008 §4.3.1 spec,JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE notNumber.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Integer"></a>
###Parameters.Validate_Integer(param, value)
Ensures that the <tt>value</tt> that is passed in is a valid integer (or an integer with a format of int32).This allows all forms of a number (so 2, 2.0, 2e0, 0x2). As a hex value COULD be the hex representationof an actual integer (and JavaScript parses it for us anyway), allow JavaScript to treat hex numbers in theway it wants to. Additionally, if a minimum or maximum is defined for this <tt>param</tt> ensure that thevalue is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined).This allows numbers between -9007199254740991 and +9007199254740991 (both inclusive) per(@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger).If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Integer_Formats"></a>
###Parameters.Validate_Integer_Formats(param, value)
Redirects the different Integer formats to their respective validation methods. For now, all types of Integerare validated the same way, with the exception of int64 as that is validated like a Number.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Number"></a>
###Parameters.Validate_Number(param, value)
Ensures that the <tt>value</tt> that is passed in is a valid number (or a number with a formats of int32, double, float, or longor a integer with a format of int64). This allows all forms of a number (so 2, 2.0, 2.2, 2e0, 0x2). As a hexvalue COULD be the hex representation of an actual number (and JavaScript parses it for us anyway), allow JavaScriptto treat hex numbers in the way it wants to. Additionally, if a minimum or maximum is defined for this <tt>param</tt>ensure that the value is greater than the minimum (if minimum defined) or less than the maximum (if maximum defined).This allows numbers between <tt>Number.MIN_VALUE</tt> and <tt>Number.MAX_VALUE</tt> (both inclusive).This does have issues with edge cases, however, (such as Number.MAX_VALUE + 1) as, per IEEE-754 2008 §4.3.1 spec,JavaScript does rounding during addition, so essentially, Number.MAX_VALUE + 1 will equal Number.MAX_VALUE notNumber.Infinity. There isn't anything we can do about this as it is correct, per spec, but it isn't intuitive.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Number_Formats"></a>
###Parameters.Validate_Number_Formats(param, value)
Redirects the different Number formats to their respective validation methods. For now, all types of Numberare validated the same way.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_Object"></a>
###Parameters.Validate_Object(param, value, models)
Ensures that the <tt>value</tt> that is passed in is a valid Object by iterating through each property on theassociated model and calling out to the respective validation method to validate that property. After validatingthe properties on this object's model, it will recursively look to see if any other models have this modelin their subType array. If so, it will validate those properties as well. It will continue to do this until nomore types are found in the subType array.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, form, etc.)  
- models `Object` - Any models that are defined for this API  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value with JSON.stringify() called on it.  
<a name="Validation.Parameters.Validate_Object_Formats"></a>
###Parameters.Validate_Object_Formats(param, value, models)
Redirects to the validate object method if this is a valid object in the model, else error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  
- models `Object` - Any models that are defined for this API  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_String"></a>
###Parameters.Validate_String(param, value)
Ensures that the <tt>value</tt> that is passed in is a valid string. Additionally, if an enum isdefined for this <tt>param</tt> ensure that the value is inside the enum list (which is case-sensitive).This also ensures that the <tt>value</tt> adheres to the <tt>pattern</tt> specified on the <tt>spec</tt>,if a pattern is specified.Additionally, if a pattern property is defined for this <tt>param</tt>, ensure that the <tt>value</tt>that is passed in matches the <tt>param</tt>'s pattern property. If <tt>param</tt> does not have a patternproperty, pattern matching is skipped. If <tt>param</tt> has an invalid pattern property a invalid patternerror is thrown.If "nothing" was passed into the validate function and it's required with no default value,then this will throw a parameter is required error.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
<a name="Validation.Parameters.Validate_String_Formats"></a>
###Parameters.Validate_String_Formats(param, value)
Redirects the different String formats to their respective validation methods.

**Params**

- param `Object` - The Swagger param that was created for this operation  
- value `Object` - The value that is passed in along the req (via body, header, etc.)  

**Returns**: `Array` - An empty Array if the <tt>value</tt> was "nothing" and not required, else an arraycontaining an object with either an error property (which contains an Array of Error objects)or a value property that contains the value parsed successfully.  
