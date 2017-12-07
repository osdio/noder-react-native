import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types'
import OverlayButton from './base/OverlayButton'
import Spinner from './base/Spinner'

const overlaySize = 45

class MarkAsReadOverlay extends Component {
  static propTypes = {
    hasNotRead: PropTypes.array,
    markAsRead: PropTypes.func,
    pending: PropTypes.bool
  };

  _onPress () {
    if (this.props.hasNotRead.length === 0) {
      window.alert('暂无未读消息!')
    }		else {
      this.props.markAsRead()
    }
  }

  _renderContent () {
    if (this.props.pending) {
      return (
        <Spinner
          style={{width: overlaySize}} />
      )
    }
    return (
      <Text style={[styles.text]}>
				已读
			</Text>
    )
  }

  render () {
    return (
      <OverlayButton
        position={styles.position}
        onPress={this._onPress.bind(this)}>
        <View style={styles.content}>
          {this._renderContent()}
        </View>
      </OverlayButton>
    )
  }
}

const styles = StyleSheet.create({
  position: {
    right: 20,
    bottom: 20
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12
  },
  content: {
    height: overlaySize,
    width: overlaySize,
    borderRadius: overlaySize / 2,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default MarkAsReadOverlay
