import {Platform} from 'react-native'

module.exports = Platform.OS === 'web' ? require('./BlurView.ios') : require('./BlurView.' + Platform.OS)
