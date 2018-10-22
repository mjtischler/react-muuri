/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

import { Component } from 'react';

import { addVisibilityTick, cancelVisibilityTick } from '../ticker.js';

import Queue from '../Queue/Queue.js';

import addClass from '../utils/addClass.js';
import getCurrentStyles from '../utils/getCurrentStyles.js';
import getTranslateString from '../utils/getTranslateString.js';
import removeClass from '../utils/removeClass.js';
import setStyles from '../utils/setStyles.js';

/**
 * Visibility manager for Item instance.
 *
 * @class
 * @param {Item} item
 */
class ItemVisibility extends Component {
  constructor(item) {
    super(item);
    const isActive = item._isActive;
    const element = item._element;
    const settings = item.getGrid()._settings;

    this._item = item;
    this._isDestroyed = false;

    // Set up visibility states.
    this._isHidden = !isActive;
    this._isHiding = false;
    this._isShowing = false;

    // Callback queue.
    this._queue = new Queue();

    // Bind show/hide finishers.
    this._finishShow = this._finishShow.bind(this);
    this._finishHide = this._finishHide.bind(this);

    // Force item to be either visible or hidden on init.
    element.style.display = isActive ? 'block' : 'none';

    // Set visible/hidden class.
    addClass(element, isActive ? settings.itemVisibleClass : settings.itemHiddenClass);

    // Set initial styles for the child element.
    setStyles(item._child, isActive ? settings.visibleStyles : settings.hiddenStyles);
  }

  /**
   * Public prototype methods
   * ************************
   */

  /**
   * Show item.
   *
   * @public
   * @memberof ItemVisibility.prototype
   * @param {Boolean} instant
   * @param {Function} [onFinish]
   * @returns {ItemVisibility}
   */
  show(instant, onFinish) {
    if (this._isDestroyed) return this;

    const item = this._item;
    const element = item._element;
    const queue = this._queue;
    const callback = typeof onFinish === 'function' ? onFinish : null;
    const grid = item.getGrid();
    const settings = grid._settings;

    // If item is visible call the callback and be done with it.
    if (!this._isShowing && !this._isHidden) {
      callback && callback(false, item);
      return this;
    }

    // If item is showing and does not need to be shown instantly, let's just
    // push callback to the callback queue and be done with it.
    if (this._isShowing && !instant) {
      callback && queue.add(callback);
      return this;
    }

    // If the item is hiding or hidden process the current visibility callback
    // queue with the interrupted flag active, update classes and set display
    // to block if necessary.
    if (!this._isShowing) {
      queue.flush(true, item);
      removeClass(element, settings.itemHiddenClass);
      addClass(element, settings.itemVisibleClass);
      if (!this._isHiding) element.style.display = 'block';
    }

    // Push callback to the callback queue.
    callback && queue.add(callback);

    // Update visibility states.
    item._isActive = this._isShowing = true;
    this._isHiding = this._isHidden = false;

    // Finally let's start show animation.
    this._startAnimation(true, instant, this._finishShow);

    return this;
  }

  /**
   * Hide item.
   *
   * @public
   * @memberof ItemVisibility.prototype
   * @param {Boolean} instant
   * @param {Function} [onFinish]
   * @returns {ItemVisibility}
   */
  hide(instant, onFinish) {
    if (this._isDestroyed) return this;

    const item = this._item;
    const element = item._element;
    const queue = this._queue;
    const callback = typeof onFinish === 'function' ? onFinish : null;
    const grid = item.getGrid();
    const settings = grid._settings;

    // If item is already hidden call the callback and be done with it.
    if (!this._isHiding && this._isHidden) {
      callback && callback(false, item);
      return this;
    }

    // If item is hiding and does not need to be hidden instantly, let's just
    // push callback to the callback queue and be done with it.
    if (this._isHiding && !instant) {
      callback && queue.add(callback);
      return this;
    }

    // If the item is showing or visible process the current visibility callback
    // queue with the interrupted flag active, update classes and set display
    // to block if necessary.
    if (!this._isHiding) {
      queue.flush(true, item);
      addClass(element, settings.itemHiddenClass);
      removeClass(element, settings.itemVisibleClass);
    }

    // Push callback to the callback queue.
    callback && queue.add(callback);

    // Update visibility states.
    this._isHidden = this._isHiding = true;
    item._isActive = this._isShowing = false;

    // Finally let's start hide animation.
    this._startAnimation(false, instant, this._finishHide);

    return this;
  }

  /**
   * Destroy the instance and stop current animation if it is running.
   *
   * @public
   * @memberof ItemVisibility.prototype
   * @returns {ItemVisibility}
   */
  destroy() {
    if (this._isDestroyed) return this;

    const item = this._item;
    const element = item._element;
    const grid = item.getGrid();
    const queue = this._queue;
    const settings = grid._settings;

    // Stop visibility animation.
    this._stopAnimation({});

    // Fire all uncompleted callbacks with interrupted flag and destroy the queue.
    queue.flush(true, item).destroy();

    // Remove visible/hidden classes.
    removeClass(element, settings.itemVisibleClass);
    removeClass(element, settings.itemHiddenClass);

    // Reset state.
    this._item = null;
    this._isHiding = this._isShowing = false;
    this._isDestroyed = this._isHidden = true;

    return this;
  }

  /**
   * Private prototype methods
   * *************************
   */

  /**
   * Start visibility animation.
   *
   * @private
   * @memberof ItemVisibility.prototype
   * @param {Boolean} toVisible
   * @param {Boolean} [instant]
   * @param {Function} [onFinish]
   */
  _startAnimation(toVisible, instant, onFinish) {
    if (this._isDestroyed) return;

    const item = this._item;
    const settings = item.getGrid()._settings;
    const targetStyles = toVisible ? settings.visibleStyles : settings.hiddenStyles;
    const duration = parseInt(toVisible ? settings.showDuration : settings.hideDuration) || 0;
    const easing = (toVisible ? settings.showEasing : settings.hideEasing) || 'ease';
    const isInstant = instant || duration <= 0;
    let currentStyles;

    // No target styles? Let's quit early.
    if (!targetStyles) {
      onFinish && onFinish();
      return;
    }

    // Cancel queued visibility tick.
    cancelVisibilityTick(item._id);

    // If we need to apply the styles instantly without animation.
    if (isInstant) {
      if (item._animateChild.isAnimating()) {
        item._animateChild.stop(targetStyles);
      } else {
        setStyles(item._child, targetStyles);
      }
      onFinish && onFinish();
      return;
    }

    // Start the animation in the next tick (to avoid layout thrashing).
    addVisibilityTick(
      item._id,
      () => {
        currentStyles = getCurrentStyles(item._child, targetStyles);
      },
      () => {
        item._animateChild.start(currentStyles, targetStyles, {
          duration,
          easing,
          onFinish
        });
      }
    );
  }

  /**
   * Stop visibility animation.
   *
   * @private
   * @memberof ItemVisibility.prototype
   * @param {Object} [targetStyles]
   */
  _stopAnimation(targetStyles) {
    if (this._isDestroyed) return;
    const item = this._item;
    cancelVisibilityTick(item._id);
    item._animateChild.stop(targetStyles);
  }

  /**
   * Finish show procedure.
   *
   * @private
   * @memberof ItemVisibility.prototype
   */
  _finishShow() {
    if (this._isHidden) return;
    this._isShowing = false;
    this._queue.flush(false, this._item);
  }

  _finishHide() {
    if (!this._isHidden) return;
    const item = this._item;
    this._isHiding = false;
    finishStyles.transform = getTranslateString(0, 0);
    item._layout.stop(true, finishStyles);
    item._element.style.display = 'none';
    this._queue.flush(false, item);
  }
}

/**
 * Finish hide procedure.
 *
 * @private
 * @memberof ItemVisibility.prototype
 */
const finishStyles = {};

export default ItemVisibility;
