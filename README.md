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

```jsx
import React, { Component } from 'react'
import MuuriGrid from 'react-muuri';

const styles = {
    item: {
      position: 'absolute',  // This is required to be declared explicitly at the `item` level.
      width: '200px',
      height: '200px',
      margin: '20px',
      backgroundColor: 'blue',
      color: 'white'
    }
}

class App extends Component {
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
        <div className="item" style={styles.item}>
          <div className="item-content">
            Box 1
          </div>
        </div>
        <div className="item" style={styles.item}>
          <div className="item-content">
            Box 2
          </div>
        </div>
      </div>
    )
  }
}

export default App;
```

## License

Copyright © 2018 [Matt Tischler](https://github.com/mjtischler). Licensed under [The MIT license](https://github.com/mjtischler/react-muuri/blob/develop/LICENSE.md).
