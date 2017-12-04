import React, {Component, PropTypes} from 'react'
import {Navigator, StyleSheet, View, Text, Image, Dimensions} from 'react-native'
import * as Home from './Home'
import * as UtilsComponent from './Utils'
import Router from '../configs/Router'
import connectComponent from '../utils/connectComponent'
import config from '../configs'

const Utils = connectComponent(UtilsComponent)

const { height, width } = Dimensions.get('window')
const initialRoute = {
  name: 'home',
  index: 0,
  component: connectComponent(Home),
  id: 0
}

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.ids = []
  }

  componentDidMount () {
    this.navigator.navigationContext.addListener('didfocus', e => {
      const { index, id } = e.data.route
      const haveFocused = this.ids.indexOf(id) > -1
      this[index] && this[index] && this[index].getWrappedInstance().componentDidFocus && this[index].getWrappedInstance().componentDidFocus(haveFocused)
      !haveFocused && this.ids.push(id)
    })
  }

  renderScene ({ component, name, props, id, index }, navigator) {
    this.router = this.router || new Router(navigator)
    if (component) {
      return React.createElement(component, {
        ...props,
        ref: view => this[index] = view,
        router: this.router,
        route: {
          name,
          id,
          index
        }
      })
    }
  }

  configureScene (route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.FloatFromRight
  }

  render () {
    return (
      <Image
        source={{ uri: config.bgImgUri }}
        style={styles.bg}>
        <Navigator
          ref={view => this.navigator = view}
          initialRoute={initialRoute}
          configureScene={this.configureScene.bind(this)}
          renderScene={this.renderScene.bind(this)} />
        <Utils />
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bg: {
    flex: 1,
    height,
    width,
    backgroundColor: 'transparent'
  }
})

export default Navigation
