import 'babel-polyfill'
import 'fetch-detector'
import 'fetch-ie8'
import {AppRegistry} from 'react-native'
import Noder from './src'

AppRegistry.registerComponent('noder', () => Noder)

var app = document.createElement('div')
document.body.appendChild(app)

AppRegistry.runApplication('noder', {
  rootTag: app
})
