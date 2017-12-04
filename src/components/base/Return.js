import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import OverlayButton from './OverlayButton'
import Icon from 'react-native-vector-icons/Ionicons'

const returnSize = 45

class Return extends Component {
  _onPress () {
    this.props.router && this.props.router.pop && this.props.router.pop()
  }

  render () {
    return (
      <OverlayButton
        onPress={this._onPress.bind(this)}>
        <View style={styles.iconWrapper}>
          <Icon
            name='ios-arrow-round-back-outline'
            size={40}
            color='rgba(255,255,255,1)'
            style={styles.returnIcon} />
        </View>
      </OverlayButton>
    )
  }
}

const styles = StyleSheet.create({
  returnIcon: {
    flex: 1,
    textAlign: 'center'
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: returnSize,
    width: returnSize
  }
})

export default Return
