import React, {Component, PropTypes} from 'react'
import {StyleSheet, Image, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons.js'
import OverlayButton from './base/OverlayButton'
import { parseImgUrl } from '../utils'

class UserOverlay extends Component {
  static propTypes = {
    toLogin: PropTypes.func,
    toUser: PropTypes.func
  };

  _onPress () {
    const { user, toLogin, toUser } = this.props
    if (user) {
      toUser()
    }		else {
      toLogin()
    }
  }

  _renderOverlayContent () {
    if (this.props.user) {
      const uri = parseImgUrl(this.props.user.avatar_url)
      return (
        <Image
          style={styles.userImg}
          source={{
            uri
          }} />
      )
    }

    return (
      <View style={styles.iconWrapper}>
        <Icon
          name='ios-person'
          size={28}
          color='rgba(255,255,255,0.9)'
          style={styles.icon}
				/>
      </View>
    )
  }

  render () {
    return (
      <OverlayButton
        onPress={this._onPress.bind(this)}>
        {this._renderOverlayContent()}
      </OverlayButton>
    )
  }
}

const styles = StyleSheet.create({
  userImg: {
    borderWidth: 2,
    borderColor: 'rgba(241,196,15,0.9)',
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45
  },
  icon: {
    flex: 1,
    textAlign: 'center'
  }
})

export default UserOverlay
