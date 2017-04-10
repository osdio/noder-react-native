import {Platform} from 'react-native'

module.exports = Platform.OS === 'web' ? require('./VibrancyView.ios') : require('./VibrancyView.' + Platform.OS)
