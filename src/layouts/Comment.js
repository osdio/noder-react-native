import React, {Component} from 'react'
import {View, StyleSheet, Text, Image, ListView, TouchableOpacity, TextInput, LayoutAnimation, Dimensions, Keyboard, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Nav from '../components/Nav'
import Spinner from '../components/base/Spinner'
import CommentList from './../components/CommentList'
import animations from '../configs/animations'
import {parseImgUrl} from '../utils'
import config from '../configs'

const {width, height} = Dimensions.get('window')
const authorImgSize = 35
const replyFormHeight = 55
const commentsHeight = height - 40 - 20 - replyFormHeight - 20
const submitButtonWidth = 55

class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      didFocus: false
    }
    if (Platform.OS !== 'web') {
      Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace.bind(this))
      Keyboard.addListener('keyboardWillHide', this.resetKeyboardSpace.bind(this))
    }

    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.updateKeyboardSpace.bind(this))
      Keyboard.addListener('keyboardDidHide', this.resetKeyboardSpace.bind(this))
    }
  }

  updateKeyboardSpace (e) {
    LayoutAnimation.configureNext(animations.keyboard.layout.spring)
    this.commentsView && this.commentsView.setNativeProps({
      style: {
        height: commentsHeight - e.endCoordinates.height
      }
    })
  }

  resetKeyboardSpace () {
    LayoutAnimation.configureNext(animations.keyboard.layout.spring)
    this.commentsView && this.commentsView.setNativeProps({
      style: {
        height: commentsHeight
      }
    })
  }

  componentDidMount () {
    const {topic, actions} = this.props
    actions.getTopicById(topic.id)
  }

  componentDidFocus (haveFocus) {
    if (!haveFocus) {
      setTimeout(() => {
        this.setState({
          didFocus: true
        })
      })
    }
  }

  _resetReplyForm () {
    this.replyId = null
    this.textInput.setNativeProps({
      text: ''
    })
    this.textInputValue = ''
    this.textInput.blur()
  }

  _doReply () {
    var content = this.textInputValue
    if (this.props.replyPending || content == '' || content == null) {
      return
    }
    let {topic, user} = this.props
    content = content + config.replySuffix
    this.props.actions.replyTopicById({
      topicId: topic.id,
      content: content,
      replyId: this.replyId,
      user: {
        loginname: user.loginname,
        avatar_url: user.avatar_url
      }
    }, () => {
      // resolved
      this._resetReplyForm()
    }, () => {
      // rejected
    })
  }

  _onReplyPress (id, authorName) {
    if (!this.props.user) { return }
    this.textInput.focus()
    let text = `@${authorName} `
    this.textInput.setNativeProps({
      text: text
    })
    this.replyId = id
    this.textInputValue = text
  }

  _onAuthorTextPress (authorName) {
    if (!this.props.user) { return }
    let text = (this.textInputValue || '') + ` @${authorName} `

    this.textInput.setNativeProps({
      text: text
    })
    this.textInputValue = text
  }

  _renderReplySubmiteIcon () {
    if (this.props.replyPending) {
      return (
        <View>
          <Spinner
            style={styles.submitIcon}
          />
        </View>
      )
    }
    return (
      <Icon
        name={'ios-reply'}
        size={28}
        color='rgba(0,0,0,0.35)'
        style={styles.submitIcon}
      />
    )
  }

  _renderReplyForm () {
    const {user} = this.props
    if (!user) { return null }

    const userImg = parseImgUrl(user.avatar_url)
    let replyFormBorder = {}
    if (Platform.OS === 'android') {
      replyFormBorder = {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.08)'
      }
    }

    return (
      <View style={[styles.replyFormWrapper, replyFormBorder]}>
        <View style={styles.replyUserImgWrapper}>
          <TouchableOpacity onPress={() => this.props.router.toUser({
            userName: user.loginname
          })}>
            <Image
              style={styles.userImg}
              source={{uri: userImg}} />
          </TouchableOpacity>
        </View>

        <View style={styles.replyInputWrapper}>
          <TextInput
            ref={view => this.textInput = view}
            value={this.state.textInput}
            multiline
            placeholder='嘿，说点啥吧'
            style={styles.replyInput}
            onChangeText={(text) => {
              this.textInput.setNativeProps({
                text: text
              })
              this.textInputValue = text
            }}
          />
        </View>

        <View style={styles.submit}>
          <TouchableOpacity
            onPress={() => this._doReply()}>
            {this._renderReplySubmiteIcon()}
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const {replies, reply = {}, router, user, actions, topic, loadPending, count} = this.props

    let navs = {
      Left: {
        text: '返回',
        onPress: () => {
          router.pop()
        }
      },
      Center: {
        text: '评论 ' + count,
        onPress: () => {
          if (count > 0) {
            this.commentList.scrollToTop()
          }
        }
      }
    }

    if (this.state.didFocus && this.props.reply && topic) {
      navs = {
        ...navs,
        Right: {
          text: '正文',
          onPress: () => {
            router.toTopic({
              topic: topic,
              id: topic.id,
              from: 'comment'
            })
          }
        }
      }
    }

    return (
      <View style={styles.container}>
        <Nav navs={navs} />

        <View ref={view => this.commentsView = view}
          style={[styles.comments, {
              height: this.props.user ? commentsHeight : commentsHeight + replyFormHeight
            }]}>

          <CommentList
            ref={(view) => this.commentList = view}
            data={this.state.didFocus ? replies : []}
            focusedReply={reply.id}
            router={router}
            user={user}
            onReplyPress={this._onReplyPress.bind(this)}
            onAuthorNamePress={this._onAuthorTextPress.bind(this)}
            onPullRefresh={() => { actions.getTopicById(topic.id) }}
            actions={actions}
            topicId={topic.id}
            pending={!this.state.didFocus || loadPending}
          />

        </View>

        {this._renderReplyForm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height
  },

  titleText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 16
  },

  comments: {
    width: width,
    height: commentsHeight
  },
  replyFormWrapper: {
    height: replyFormHeight + 4,
    width: width,
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: -2,
      height: -2
    },
    shadowOpacity: 0.1,
    alignItems: 'center'
  },
  replyUserImgWrapper: {
    width: authorImgSize + 15 * 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  userImg: {
    height: authorImgSize,
    width: authorImgSize,
    resizeMode: Image.resizeMode.contain,
    borderRadius: authorImgSize / 2
  },
  replyInputWrapper: {
    width: width - replyFormHeight - submitButtonWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  replyInput: {
    flex: 1,
    fontSize: 14,
    height: Platform.OS === 'ios' ? 14 * 2 : 55
    // lineHeight: 14 * 1.4
  },
  submitIcon: {
    width: authorImgSize,
    height: authorImgSize
  }
})

export const LayoutComponent = Comment
export function mapStateToProps ({user, topic, topicUI}, props) {
  const {id = '0'} = props
  const topicInfo = topic.topics[id] || props.topic
  const count = topicInfo && topicInfo.replies && topicInfo.replies.length || 0
  return {
    count,
    user: user.secret,
    topic: topicInfo,
    loadPending: topicUI.loadPending[id],
    replyPending: topicUI.replyPending[id],
    replies: topicInfo && topicInfo.replies || []
  }
}
