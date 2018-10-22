/**
 * Muuri Queue
 * Copyright (c) 2018-present, Niklas Rämö <inramo@gmail.com>
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/src/Queue/LICENSE.md
 */

import { Component } from 'react';

/**
 * Queue constructor.
 *
 * @class
 */
class Queue extends Component {
  constructor() {
    super();
    this._queue = [];
    this._isDestroyed = false;
  };

  /**
  * Public prototype methods
  * ************************
  */

  /**
  * Add callback to the queue.
  *
  * @public
  * @memberof Queue.prototype
  * @param {Function} callback
  * @returns {Queue}
  */
  add(callback) {
    if (this._isDestroyed) return this;
    this._queue.push(callback);
    return this;
  };

  /**
  * Process queue callbacks and reset the queue.
  *
  * @public
  * @memberof Queue.prototype
  * @param {*} arg1
  * @param {*} arg2
  * @returns {Queue}
  */
  flush(arg1, arg2) {
    if (this._isDestroyed) return this;

    const queue = this._queue;
    const length = queue.length;
    let i;

    // Quit early if the queue is empty.
    if (!length) return this;

    const singleCallback = length === 1;
    const snapshot = singleCallback ? queue[0] : queue.slice(0);

    // Reset queue.
    queue.length = 0;

    // If we only have a single callback let's just call it.
    if (singleCallback) {
      snapshot(arg1, arg2);
      return this;
    }

    // If we have multiple callbacks, let's process them.
    for (i = 0; i < length; i++) {
      snapshot[i](arg1, arg2);
      if (this._isDestroyed) break;
    }

    return this;
  }

  /**
  * Destroy Queue instance.
  *
  * @public
  * @memberof Queue.prototype
  * @returns {Queue}
  */
  destroy() {
    if (this._isDestroyed) return this;

    this._isDestroyed = true;
    this._queue.length = 0;

    return this;
  }
}

export default Queue;
