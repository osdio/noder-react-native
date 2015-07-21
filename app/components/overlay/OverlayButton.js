var React = require('react-native')
var Button = require('react-native-button')

var {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet
    } = React

var overlayButtonSize = 45

var styles = StyleSheet.create({
    container: {
        height: overlayButtonSize,
        width: overlayButtonSize,
        position: 'absolute',
        //left: 20,
        //bottom: 20,
        borderRadius: overlayButtonSize / 2,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    returnIcon: {
        height: overlayButtonSize,
        width: overlayButtonSize,
        borderRadius: overlayButtonSize / 2
    },
    defaultPosition: {
        left: 20,
        bottom: 20
    }
})


class OverlayButton extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View
                style={[styles.container,this.props.position?this.props.position:styles.defaultPosition,this.props.style]}>
                <Button
                    style={this.props.buttonStyle}
                    onPress={this.props.onPress}>
                    {this.props.children}
                </Button>
            </View>
        )
    }
}


module.exports = OverlayButton
