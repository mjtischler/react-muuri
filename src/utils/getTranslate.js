/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

import getStyle from './getStyle.js';

const translateData = {};

/**
 * Returns the element's computed translateX and translateY values as a floats.
 * The returned object is always the same object and updated every time this
 * function is called.
 *
 * @param {HTMLElement} element
 * @returns {Object}
 */
export default function getTranslate(element) {
  translateData.x = 0;
  translateData.y = 0;

  const transform = getStyle(element, 'transform');
  if (!transform) return translateData;

  const matrixData = transform.replace('matrix(', '').split(',');
  translateData.x = parseFloat(matrixData[4]) || 0;
  translateData.y = parseFloat(matrixData[5]) || 0;

  return translateData;
}
