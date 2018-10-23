# react-muuri

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

  componentDidMount() {
    this.grid = new MuuriGrid({
      container: '.grid',
      defaultOptions: {
        dragEnabled: true // See Muuri's documentation for other option overrides.
      }
    });
  }

  render () {
    return (
      <div className="grid">
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
  background-color: orange; /* Go */
}

.box2 {
  background-color: blue; /* Gators */
}
```

## License

Copyright © 2018 [Matt Tischler](https://github.com/mjtischler). Licensed under [The MIT license](https://github.com/mjtischler/react-muuri/blob/develop/LICENSE.md).
