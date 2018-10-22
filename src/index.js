import { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid/Grid';

export default class MuuriGrid extends Component {
  static propTypes = {
    container: PropTypes.string.isRequired,
    defaultOptions: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.grid = new Grid(props.container, props.defaultOptions);
  }
}
