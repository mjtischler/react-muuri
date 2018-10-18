/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

import Ticker from './Ticker/Ticker.js';

const ticker = new Ticker();

const layoutTick = 'layout';
const visibilityTick = 'visibility';
const moveTick = 'move';
const scrollTick = 'scroll';

export default ticker;

export const addLayoutTick = (itemId, readCallback, writeCallback) => {
  return ticker.add(itemId + layoutTick, readCallback, writeCallback);
};

export const cancelLayoutTick = (itemId) => {
  return ticker.cancel(itemId + layoutTick);
};

export const addVisibilityTick = (itemId, readCallback, writeCallback) => {
  return ticker.add(itemId + visibilityTick, readCallback, writeCallback);
};

export const cancelVisibilityTick = (itemId) => {
  return ticker.cancel(itemId + visibilityTick);
};

export const addMoveTick = (itemId, readCallback, writeCallback) => {
  return ticker.add(itemId + moveTick, readCallback, writeCallback, true);
};

export const cancelMoveTick = (itemId) => {
  return ticker.cancel(itemId + moveTick);
};

export const addScrollTick = (itemId, readCallback, writeCallback) => {
  return ticker.add(itemId + scrollTick, readCallback, writeCallback, true);
};

export const cancelScrollTick = (itemId) => {
  return ticker.cancel(itemId + scrollTick);
};
