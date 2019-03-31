import React, { Component } from 'react';
import MuuriGrid from 'react-muuri';
import './MuuriGrid.css';

class GridComponent extends Component {
  constructor () {
    super();

    this.removeElement = this.removeElement.bind(this);
  }

  componentDidMount () {
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true // See Muuri's documentation for other option overrides.
      }
    });

    this.grid.getEvent('dragEnd'); // An example of how to use `getEvent()` to make `synchronize()` update the grid.
  }

  componentWillUnmount () {
    this.grid.getMethod('destroy'); // Required: Destroy the grid when the component is unmounted.
  }

  removeElement () {
    // An example of how to use `getMethod()` to remove an element from the grid.
    if (this.gridElement && this.gridElement.children.length) {
      this.grid.getMethod('remove', this.gridElement.children[0], {removeElements: true});
    }
  }

  render () {
    return (
      <div>
        {/* Assign a ref to the grid container so the virtual DOM will ignore it for now (WIP). */}
        <div data-testid='box_container' ref={gridElement => this.gridElement = gridElement}> // eslint-disable-line no-return-assign
          {/* Required: `item` and `item-content` classNames */}
          <div data-testid='box_1' className='item box1'>
            <div className='item-content'>
              Box 1
            </div>
          </div>
          <div data-testid='box_2' className='item box2'>
            <div className='item-content'>
              Box 2
            </div>
          </div>
        </div>
        <button
          className='button'
          data-testid='remove_button'
          onClick={() => this.removeElement()}
        >
          Remove 1st Element
        </button>
      </div>
    );
  }
}

export default GridComponent;
