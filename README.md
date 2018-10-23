# react-muuri 0.1.0

> A React implementation of Muuri

[![NPM](https://img.shields.io/npm/v/react-muuri.svg)](https://www.npmjs.com/package/react-muuri) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Acknowledgements
This React implementation is based upon the amazing work done by Haltu Oy and others over at [https://github.com/haltu/muuri](https://github.com/haltu/muuri).

## Install

```bash
npm install --save react-muuri
```

## Usage

Sample component:
```jsx
import React, { Component } from 'react'
import MuuriGrid from 'react-muuri';
import './MuuriGrid.css'

class SampleComponent extends Component {
  constructor () {
    super();

    this.removeElement = this.removeElement.bind(this);
  }

  componentDidMount () {
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true // See Muuri's documentation for other option overrides.
      },
    });
  }

  componentWillUnmount () {
    this.grid.getMethod('destroy'); // Required: Destroy the grid when the component is unmounted.
  }

  removeElement () {
    // An example of how to use `getMethod()` to remove an element from the grid.
    if (this.gridElement && this.gridElement.children.length) {
      this.grid.getMethod('remove', this.gridElement.children[0], {removeElements: true})
    }
  }

  render () {
    return (
      <div>
        {/* Assign a ref to the grid container so the virtual DOM will ignore it for now (WIP). */}
        <div ref={gridElement => this.gridElement = gridElement}>
          {/* Required: `item` and `item-content` classNames */}
          <div className="item box1">
            <div className="item-content">
              Box 1
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
              Box 2
            </div>
          </div>
        </div>
        <button
          className="button"
          onClick={() => this.removeElement()}
        >
          Remove 1st Element
        </button>
      </div>
    )
  }
}

export default SampleComponent;
```

Sample CSS:

```css
.item {
  color: white;
  cursor: pointer;
  height: 200px;
  margin: 20px;
  position: absolute; /* Required by Muuri */
  width: 200px;
}

.muuri-item-dragging {
  z-index: 3;   /* Required by Muuri */
}

.muuri-item-releasing {
  z-index: 2; /* Required by Muuri */
}

.muuri-item-hidden {
  z-index: 0; /* Required by Muuri */
}

.box1 {
  background-color: orange;
}

.box2 {
  background-color: blue;
}

.button {
  background-color: gray;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  margin: 20px;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  width: 200px;
}
```

## License

Copyright © 2018 [Matt Tischler](https://github.com/mjtischler). Licensed under [The MIT license](https://github.com/mjtischler/react-muuri/blob/develop/LICENSE.md).
