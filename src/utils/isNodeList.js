/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

const htmlCollectionType = '[object HTMLCollection]';
const nodeListType = '[object NodeList]';

/**
 * Check if a value is a node list
 *
 * @param {*} val
 * @returns {Boolean}
 */
export default function isNodeList(val) {
  const type = Object.prototype.toString.call(val);
  return type === htmlCollectionType || type === nodeListType;
}
