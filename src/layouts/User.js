import React, {Component} from 'react'
import {View, Dimensions, StyleSheet, Text, Image, TouchableOpacity, LayoutAnimation} from 'react-native'
import moment from 'moment'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import UserTopicList from '../components/UserTopicList'
import TabBar from '../components/TabBar'
import Spinner from '../components/base/Spinner'
import Return from '../components/base/Return'
import Setting from '../components/Setting'
import ErrorHandle from '../components/base/ErrorHandle'
import {parseImgUrl, link, genColor} from '../utils'

const {height, width} = Dimensions.get('window')

class User extends Component {
  constructor (props) {
    super(props)
    this.isClientUser = props.isClientUser
    this.wallColor = genColor()
    this.state = {
      didFocus: false
    }
  }

  componentDidMount () {
    this._getUserInfo()
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

  _getUserInfo () {
    const {actions, user, userName} = this.props
    if (this.isClientUser) {
      actions.updateClientUserInfo(user)
    }		else {
      actions.getUserInfo(userName)
    }
  }

  _onGithubPress (name) {
    if (name == '' || !name) { return }
    link('https://github.com/' + name)
  }

  render () {
    const {userInfo, ui} = this.props
    const spinnerView = (
      <View style={styles.loadingWrapper}>
        <Spinner
          size='large'
          style={styles.loading} />
      </View>
		)

		// 如果访问的不是登陆用户的信息
    if (!this.isClientUser && ui.otherUserPending) {
      return (
        <View style={styles.container}>
          { spinnerView }
        </View>
      )
    }

		// 如果用户信息获取失败
    if (!userInfo) {
      return (
        <View style={styles.container}>
          <ErrorHandle onPress={() => this._getUserInfo()} />
        </View>
      )
    }

    const scrollView = (
      <ScrollableTabView
        edgeHitWidth={(width / 3) * 2}
        renderTabBar={() => <TabBar />}>
        <UserTopicList
          router={this.props.router}
          style={styles.userTopicPage}
          data={userInfo.recent_replies}
          tabLabel='最近回复' />
        <UserTopicList
          router={this.props.router}
          style={styles.userTopicPage}
          data={userInfo.recent_topics}
          tabLabel='最近发布' />
      </ScrollableTabView>
		)

    const pubTopicIcon = (
      <TouchableOpacity
        onPress={() => {
          this.props.router.toPublish()
        }}>
        <View style={styles.iconWrapper}>
          <Icon
            name='ios-paper-outline'
            size={34}
            color='rgba(255,255,255,0.7)' />
        </View>
      </TouchableOpacity>
		)

    const settingIcon = (
      <TouchableOpacity
        onPress={() => this.setting.show()}>
        <View style={styles.iconWrapper}>
          <Icon
            name='ios-cog'
            size={34}
            color='rgba(255,255,255,0.7)' />
        </View>
      </TouchableOpacity>
		)
    return (
      <View style={styles.container}>
        <View style={[styles.bgWall, {backgroundColor: this.wallColor}]}>
          <View style={styles.imgRow}>
            { this.isClientUser && pubTopicIcon }

            <TouchableOpacity
              onPress={this._onGithubPress.bind(this, userInfo.githubUsername)}>
              <Image
                style={styles.authorImg}
                source={{uri: parseImgUrl(userInfo.avatar_url)}} />
            </TouchableOpacity>

            { this.isClientUser && settingIcon }
          </View>

          <TouchableOpacity
            onPress={this._onGithubPress.bind(this, userInfo.loginname)}>
            <Text style={styles.github}>
              {userInfo.loginname}
            </Text>
          </TouchableOpacity>

          <View style={styles.bgWallFooter}>
            <Text style={styles.bgWallFooterText}>
              {'注册时间: ' + moment(userInfo.create_at).format('l')}
            </Text>

            <Text style={styles.bgWallFooterText}>
              {'积分:' + userInfo.score}
            </Text>
          </View>
        </View>

        { this.state.didFocus ? scrollView : spinnerView }

        <Return router={this.props.router} />

        <Setting ref={(view) => this.setting = view} router={this.props.router}
          actions={this.props.actions} />
      </View>
    )
  }
}

const bgWallHeight = 160
const authorImgSize = 60
const fontColor = 'rgba(255,255,255,0.7)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  loading: {
    flex: 1,
    width: 50
  },
  loadingWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgWall: {
    height: bgWallHeight,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10
  },
  imgRow: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: authorImgSize
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  authorImg: {
    flex: 1,
    height: authorImgSize,
    width: authorImgSize,
    borderRadius: authorImgSize / 2
  },
  bgWallFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingLeft: 10,
    paddingRight: 10
  },
  bgWallFooterText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)'
  },
  github: {
    color: fontColor
  },
  userTopicPage: {
    height: height - bgWallHeight - 70
  }
})

export const LayoutComponent = User
export function mapStateToProps (state, props) {
  const {userName} = props
  let userInfo = state.user.publicInfo || null
  const isClientUser = userInfo && userInfo.loginname === userName
  return {
    user: state.user,
    ui: state.userUI,
    isClientUser,
    userInfo: isClientUser ? userInfo : state.user.users[userName]
  }
}
