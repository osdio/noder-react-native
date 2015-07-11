var React = require('react-native')
var Dimensions = require('Dimensions');

var {
    Navigator
    } = React

var { width, height } = Dimensions.get('window');


var baseConfig = Navigator.SceneConfigs.FloatFromRight;
var popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
    edgeHitWidth: width / 3
});


exports.customFloatFromRight = Object.assign({}, baseConfig, {
    gestures: {
        pop: popGestureConfig
    }
});