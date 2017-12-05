import React, {Component} from 'react'
import {Platform, View, StyleSheet, Text, StatusBar, AppState} from 'react-native'
import Toast from '../components/base/Toast'
import * as codePushUtils from '../utils/codePushSync'

class Utils extends Component {
  componentDidMount () {
    const {actions} = this.props
    actions.getReducerFromAsyncStorage(({user}) => {
      if (user && user.secret) {
        actions.getUnreadMessageCount()
      }
    })
    if (Platform.OS !== 'web') {
      codePushUtils.sync()
      AppState.addEventListener('change', (newState) => {
        if (newState === 'active') {
          codePushUtils.sync()
          this.props.user.secret && actions.getUnreadMessageCount()
        }
      })
    }

		// if (__DEV__) {
		// 	actions.checkToken('your secretKey', ()=> {
		// 		actions.toast('登陆成功');
		// 	});
		// }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.toast.id !== nextProps.toast.id) {
      this.toast.show(nextProps.toast.text, nextProps.toast.timeout)
    }
  }

  render () {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.container}>
          <Toast ref={(view) => this.toast = view} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <Toast ref={(view) => this.toast = view} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export const LayoutComponent = Utils
export function mapStateToProps (state) {
  const {utils = {}, user} = state
  return {
    ...utils,
    user
  }
}
