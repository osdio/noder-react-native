import {Platform} from 'react-native'

module.exports = Platform.OS === 'web' ? require('./Button.ios') : require('./Button.' + Platform.OS)
