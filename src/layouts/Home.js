import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, Alert, Easing, Platform} from 'react-native'
import UserOverlay from '../components/UserOverlay'
import MessageOverlay from '../components/MessageOverlay'
import ScrollableTabs from '../components/ScrollableTabs'
import * as TopicListComponent from './TopicList'
import * as Tabs from '../constants/Tabs'
import connectComponent from '../utils/connectComponent'

const TopicList = connectComponent(TopicListComponent)
const {height, width} = Dimensions.get('window')

class Home extends Component {
  componentDidMount () {
    const {actions, topic} = this.props
    if (!topic.all || !topic.all.length) {
      actions.updateTopicsByTab('all')
    }

    // Just for test on Android, see workaroundOfStartNative() in e2e/steps/init.js
    if (Platform.OS === 'android') {
      Alert.alert(
        'Welcome',
        'Welcome to Noder', [{
          text: 'OK',
          onPress: () => {}
        }]
      )
    }
  }

  _onPageChanged (page, isScrolling) {
    const {actions, topic, ui} = this.props
    const tab = Tabs.tabs[page]
    if (!topic[tab] || !topic[tab].length) {
      actions.updateTopicsByTab(tab)
    }
  }

  _renderTopicList () {
    return ['good', 'ask', 'all', 'share', 'job'].map((item) => {
      return (
        <TopicList
          router={this.props.router}
          key={item} tab={item}
          isTabScrolling={() => this._scrollableTabs && this._scrollableTabs.isScrolling()()}
        />
      )
    })
  }

  render () {
    const {router, user, message} = this.props
    return (
      <View style={styles.container}>
        <ScrollableTabs
          ref={view => this._scrollableTabs = view}
          tabs={['精华', '问答', '主页', '分享', '招聘']}
          onPageChangedAndAnimateEnd={this._onPageChanged.bind(this)}
        >
          { this._renderTopicList() }
        </ScrollableTabs>

        <UserOverlay user={user.secret}
          toLogin={() => router.toLogin()}
          toUser={() => router.toUser({ userName: user.publicInfo.loginname })} />

        <MessageOverlay user={user.secret}
          count={message.unreadMessageCount}
          toMessage={() => router.toMessage()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
  bg: {
    width,
    height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const LayoutComponent = Home
export function mapStateToProps (state) {
  return {
    user: state.user,
    message: state.message,
    topic: state.topic,
    ui: state.home
  }
}
