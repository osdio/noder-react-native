import React from 'react'
import {Dimensions} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'

const { width } = Dimensions.get('window')

const baseConfig = Navigator.SceneConfigs.FloatFromRight
const popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
  edgeHitWidth: width / 3
})

const fullPopGestureConfig = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom.gestures.pop, {
  edgeHitWidth: width
})

export const customFloatFromRight = Object.assign({}, baseConfig, {
  gestures: {
    pop: popGestureConfig
  }
})

export const customFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom, {
  gestures: {
    pop: fullPopGestureConfig
  }
})
