import React, {Component} from 'react'
import {ActivityIndicator} from 'react-native'

class Spinner extends Component {
  static defaultProps={
    color: 'rgba(241,196,15, 1.0)'
  };

  render () {
    return (
      <ActivityIndicator
        animating
        {...this.props} />
    )
  }
}

export default Spinner
