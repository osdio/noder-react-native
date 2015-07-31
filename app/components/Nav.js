var React = require('react-native')

var window = require('../util/window')
var { width, height } = window.get()


var {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
    } = React


class Nav extends Component {
    constructor(props) {
        super(props)
    }


    _renderNavContent() {
        var navs = this.props.navs || {}

        return ['Left', 'Center', 'Right'].map((position)=> {
            var nav = navs[position]
            if (nav) {
                return (
                    <TouchableOpacity
                        onPress={nav.onPress}
                        >
                        <Text style={[styles.navItem,styles['nav'+position]]}>
                            {nav.text}
                        </Text>
                    </TouchableOpacity>
                )
            }
            return (
                <View style={[styles.navItem,styles['nav'+position]]}>
                </View>
            )
        })
    }


    render() {
        return (
            <View
                ref={view=>this.nav=view}
                style={styles.nav}>

                {this._renderNavContent()}

            </View>
        )
    }
}

var navHeight = 55

var styles = StyleSheet.create({
    nav: {
        height: navHeight,
        width: width,
        borderBottomColor: 'rgba(0,0,0,0.03)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navItem: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: 16
    },
    navLeft: {
        textAlign: 'left',
        paddingLeft: 15,
        flex: 1
    },
    navRight: {
        textAlign: 'right',
        paddingRight: 15,
        flex: 1
    },
    navCenter: {
        textAlign: 'center',
        flex: 2
    }
})


module.exports = Nav
