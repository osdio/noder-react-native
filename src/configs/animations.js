import React from 'react'
import {LayoutAnimation} from 'react-native'

var animations = {}

animations.keyboard = {
  layout: {
    spring: {
      duration: 400,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 400
      }
    },
    easeInEaseOut: {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    }
  }
}

export default animations
