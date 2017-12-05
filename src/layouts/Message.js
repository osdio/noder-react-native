import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Platform, StatusBar} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'
import Return from '../components/base/Return'
import MessageList from '../components/MessageList'

const {height, width} = Dimensions.get('window')
const STATUS_BAR_HEIGHT = 20

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      didFocus: false
    }
  }

  componentDidMount () {
    this.props.actions.getMessageList()
  }

  componentWillUnmount () {
    this.props.actions.markAsRead()
  }

  componentDidFocus (haveFocused) {
    if (!haveFocused) {
      setTimeout(() => {
        this.setState({
          didFocus: true
        })
      })
    }
  }

  _renderTabBar () {
    const statusBarHeight = Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    const props = {
      style: {
        backgroundColor: '#292829',
        height: 50 + 4 + statusBarHeight,
        paddingTop: statusBarHeight
      },
      activeTabTextColor: 'white',
      normalTabTextColor: 'rgba(255,255,255,0.7)',
      tabUnderlineStyle: {
        backgroundColor: 'rgba(241,196,15,1)'
      }
    }
    return (
      <TabBar {...props} />
    )
  }

  render () {
    const {fetchMessagesPending, hasNotRead, hasRead, isMarkAsReadLoading, actions, router} = this.props

    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={styles.scrollableTabView}
          edgeHitWidth={(width / 3) * 2}
          renderTabBar={this._renderTabBar.bind(this)}>
          <MessageList
            router={router}
            didFocus={this.state.didFocus}
            pending={fetchMessagesPending}
            data={this.state.didFocus ? hasNotRead : []}
            style={styles.userTopicPage}
            tabLabel={'未读消息 ' + hasNotRead.length}
            getMessageList={actions.getMessageList}
					/>
          <MessageList
            router={router}
            didFocus={this.state.didFocus}
            pending={fetchMessagesPending}
            data={this.state.didFocus ? hasRead : []}
            style={styles.userTopicPage}
            tabLabel={'已读消息 ' + hasRead.length}
            getMessageList={actions.getMessageList}
					/>
        </ScrollableTabView>

        <Return router={router} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height,
    width
  },
  scrollableTabView: {
    flex: 1
  }
})

export const LayoutComponent = Message
export function mapStateToProps (state) {
  return {
    ...state.message,
    ...state.messageUI
  }
}
