/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

// Set up the default export values.
export const isTransformSupported = false;
export const transformStyle = 'transform';
export const transformProp = 'transform';

// Find the supported transform prop and style names.
const style = 'transform';
const styleCap = 'Transform';
['', 'Webkit', 'Moz', 'O', 'ms'].forEach(function(prefix) {
  if (isTransformSupported) return;
  const propName = prefix ? prefix + styleCap : style;
  if (document.documentElement.style[propName] !== undefined) {
    prefix = prefix.toLowerCase();
    transformStyle = prefix ? '-' + prefix + '-' + style : style;
    transformProp = propName;
    isTransformSupported = true;
  }
});
