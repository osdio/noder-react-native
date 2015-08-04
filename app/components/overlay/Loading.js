var React = require('react-native')
var { Icon } = require('react-native-icons')
var Modal = require('react-native-modal')

var window = require('../../util/window')
var { width, height } = window.get()


var {
    View,
    StyleSheet,
    Component,
    Text,
    Image,
    ActivityIndicatorIOS
    } = React


class Loading extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Modal
                style={modalStyles}
                hideCloseButton={true}
                isVisible={this.props.isVisible}
                >

                <ActivityIndicatorIOS
                    style={modalStyles.row}
                    size='large'
                    ></ActivityIndicatorIOS>
            </Modal>
        )
    }
}


var modalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.3,
    },
    modal: {
        backgroundColor: 'white',
        flex: 1,
        height: 120,
        width: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})


module.exports = Loading
