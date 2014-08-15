/** @namespace Polyfills */
'use strict';

/**
 * This is a polyfill for checking if something is an integer. This is proposed functionality in ECMA6 (aka Harmony). <br/>
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill}
 * @method isInteger
 * @memberOf Polyfills
 * @param {Object} nVal The value to be checked
 * @returns {Boolean} True if <tt>nVal</tt> can successfully be parsed as an Integer, else false.
 */
if (!Number.isInteger) {
  Number.isInteger = function isInteger(nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
  };
}

/**
 * This is a polyfill for checking if something is an int64.
 * @method isInt64
 * @memberOf Polyfills
 * @param {Object} nVal The value to be checked
 * @returns {Boolean} True if <tt>nVal</tt> can successfully be parsed as an int64, else false.
 */
if (!Number.isInt64) {
  Number.isInt64 = function isInt64(nVal) {
    return typeof nVal === "number" && isFinite(nVal) && Math.floor(nVal) === nVal;
  };
}