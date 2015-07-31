var React = require('react-native')

var Nav = require('../components/Nav')

var window = require('../util/window')
var { width, height } = window.get()


var {
    Component,
    View,
    Text,
    StyleSheet
    } = React


class Publish extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        var router = this.props.router

        var navs = {
            Left: {
                text: '返回',
                onPress: ()=> {
                    router.pop()
                }
            },
            Center: {
                text: '发表帖子'
            },
            Right: {
                text: '发布',
                onPress: ()=> {

                }
            }
        }
        return (
            <View style={styles.container}>
                <Nav
                    navs={navs}
                    ></Nav>
            </View>
        )
    }
}

var styles = StyleSheet.create({})

module.exports = Publish


