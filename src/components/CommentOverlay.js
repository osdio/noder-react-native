import React, {Component, PropTypes} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import OverlayButton from './base/OverlayButton'

const overlaySize = 45
const iconSize = 12

class CommentOverlay extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    replyCount: PropTypes.number
  };

  static defaultProps = {
    replyCount: 0
  };

  _renderCommentReplyCount (count) {
    if (count > 999) {
      return '1k+'
    }
    return count
  }

  render () {
    return (
      <OverlayButton
        position={styles.position}
        onPress={this.props.onPress}>
        <View style={styles.content}>
          <Icon
            name='ios-chatboxes'
            size={13}
            color='white'
            style={styles.commentIcon}
					/>
          <Text style={styles.commentText}>
            {this._renderCommentReplyCount(this.props.replyCount)}
          </Text>
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
  commentText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    paddingLeft: 4
  },
  content: {
    height: overlaySize,
    width: overlaySize,
    borderRadius: overlaySize / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentIcon: {
    height: iconSize,
    width: iconSize
  }
})

export default CommentOverlay
