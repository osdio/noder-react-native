import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import OverlayButton from './base/OverlayButton'
import Icon from 'react-native-vector-icons/Ionicons'

class MessageOverlay extends Component {
  static propTypes = {
    count: PropTypes.number,
    toMessage: PropTypes.func
  };

  static defaultProps = {
    count: 0,
    toMessage: () => null
  };

  _renderMessageCount () {
    const count = this.props.count

    if (count > 0) {
      return (
        <View style={styles.countWrapper}>
          <Text style={styles.countText}>
            {count > 999 ? '1k+' : count}
          </Text>
        </View>
      )
    }

    return null
  }

  render () {
    if (this.props.user) {
      return (
        <OverlayButton
          position={styles.position}
          onPress={() => this.props.toMessage()}>
          <View style={styles.iconWrapper}>
            <Icon
              name='ios-email-outline'
              size={28}
              color='rgba(255,255,255,0.9)'
              style={styles.icon} />
          </View>

          {this._renderMessageCount()}
        </OverlayButton>
      )
    }
    return null
  }
}

const overlaySize = 45
const countBoxSize = 20
const countTextSize = 10

const styles = StyleSheet.create({
  iconWrapper: {
    height: overlaySize,
    width: overlaySize,
    borderRadius: overlaySize / 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    flex: 1,
    textAlign: 'center'
  },
  countWrapper: {
    height: countBoxSize,
    width: countBoxSize,
    borderRadius: countBoxSize / 2,
    backgroundColor: 'red',
    position: 'absolute',
    right: -5,
    top: -5
  },
  countText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: countTextSize,
    lineHeight: countBoxSize - countTextSize / 2,
    textAlign: 'center',
    height: countBoxSize,
    width: countBoxSize,
    borderRadius: countBoxSize / 2,
    backgroundColor: 'transparent'
  },
  position: {
    right: 20,
    bottom: 20
  },
  container: {
    backgroundColor: 'blue',
    borderRadius: overlaySize / 2
  }
})

export default MessageOverlay
