/**
 * Muuri Ticker
 * Copyright (c) 2018-present, Niklas Rämö <inramo@gmail.com>
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/src/Ticker/LICENSE.md
 */

import { Component } from 'react';

function rafFallback(cb) {
  return window.setTimeout(cb, 16);
}

const raf = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  rafFallback
).bind(window);

/**
 * A ticker system for handling DOM reads and writes in an efficient way.
 * Contains a read queue and a write queue that are processed on the next
 * animation frame when needed.
 *
 * @class
 */
class Ticker extends Component {
  constructor() {
    super();
    this._nextTick = null;

    this._queue = [];
    this._reads = {};
    this._writes = {};

    this._batch = [];
    this._batchReads = {};
    this._batchWrites = {};

    this._flush = this._flush.bind(this);
  }

  add(id, readCallback, writeCallback, isImportant) {
    // First, let's check if an item has been added to the queues with the same id
    // and if so -> remove it.
    const currentIndex = this._queue.indexOf(id);
    if (currentIndex > -1) this._queue[currentIndex] = undefined;

    // Add all important callbacks to the beginning of the queue and other
    // callbacks to the end of the queue.
    isImportant ? this._queue.unshift(id) : this._queue.push(id);

    // Store callbacks.
    this._reads[id] = readCallback;
    this._writes[id] = writeCallback;

    // Finally, let's kick-start the next tick if it is not running yet.
    if (!this._nextTick) this._nextTick = raf(this._flush);
  }

  cancel(id) {
    const currentIndex = this._queue.indexOf(id);
    if (currentIndex > -1) {
      this._queue[currentIndex] = undefined;
      this._reads[id] = undefined;
      this._writes[id] = undefined;
    }
  }

  _flush() {
    const queue = this._queue;
    const reads = this._reads;
    const writes = this._writes;
    const batch = this._batch;
    const batchReads = this._batchReads;
    const batchWrites = this._batchWrites;
    const length = queue.length;
    let id;
    let i;

    // Reset ticker.
    this._nextTick = null;

    // Setup queues and callback placeholders.
    for (i = 0; i < length; i++) {
      id = queue[i];
      if (!id) continue;

      batch.push(id);

      batchReads[id] = reads[id];
      reads[id] = undefined;

      batchWrites[id] = writes[id];
      writes[id] = undefined;
    }

    // Reset queue.
    queue.length = 0;

    // Process read callbacks.
    for (i = 0; i < length; i++) {
      id = batch[i];
      if (batchReads[id]) {
        batchReads[id]();
        batchReads[id] = undefined;
      }
    }

    // Process write callbacks.
    for (i = 0; i < length; i++) {
      id = batch[i];
      if (batchWrites[id]) {
        batchWrites[id]();
        batchWrites[id] = undefined;
      }
    }

    // Reset batch.
    batch.length = 0;

    // Restart the ticker if needed.
    if (!this._nextTick && queue.length) {
      this._nextTick = raf(this._flush);
    }
  }
}

export default Ticker;
