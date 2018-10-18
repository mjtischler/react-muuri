/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

const objectType = '[object Object]';
const toString = Object.prototype.toString;

/**
 * Check if a value is a plain object.
 *
 * @param {*} val
 * @returns {Boolean}
 */
export default function isPlainObject(val) {
  return typeof val === 'object' && toString.call(val) === objectType;
}
