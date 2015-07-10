var React = require('react-native')
var OverlayButton = require('./overlayButton')
var Icon = require('FAKIconImage')

var {
    Component,
    View,
    StyleSheet
    } = React


class Return2 extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <OverlayButton
                style={styles.container}
                position={styles.position}
                onPress={this.props.onPress}>
                <Icon
                    name='ion|ios-arrow-left'
                    size={28}
                    color='rgba(255,255,255,0.7)'
                    style={styles.icon}/>
            </OverlayButton>
        )
    }
}

var styles = StyleSheet.create({
    position: {
        position: 'absolute',
        left: 15,
        top: 15
    },
    container: {
        backgroundColor: 'transparent'
    },
    icon: {
        width: 20,
        height: 20
    }
})


module.exports = Return2
