var React = require('react-native')

var HtmlRender = require('react-native-html-render')

var window = require('../../util/window')
var routes = require('../../configs/routes')


var { width, height } = window.get()

var {
    Component,
    View,
    Text,
    StyleSheet,
    Image,
    LinkingIOS,
    Navigator
    }=React

var contentFontSize = 16


var styles = StyleSheet.create({
    img: {
        width: width - 30,
        height: width - 30,
        resizeMode: Image.resizeMode.contain
    }
})


class HtmlContent extends Component {
    constructor(props) {
        super(props)
    }


    _onLinkPress(url) {
        if (/^\/user\/\w*/.test(url)) {
            let authorName = url.replace(/^\/user\//, '')
            this.props.router.toUser({
                userName: authorName
            })
        }

        if (/^https?:\/\/.*/.test(url)) {
            window.link(url)
        }
    }


    _renderNode(node, index, parent, type) {
        var name = node.name
        if (node.type == 'block' && type == 'block') {
            if (name == 'img') {
                var uri = node.attribs.src;
                if (/^\/\/dn-cnode\.qbox\.me\/.*/.test(uri)) {
                    uri = 'https:' + uri
                }
                return (
                    <View
                        key={index}
                        style={styles.imgWrapper}>
                        <Image source={{uri:uri}}
                               style={styles.img}>
                        </Image>
                    </View>
                )
            }
        }
    }


    render() {
        return (
            <HtmlRender
                value={this.props.content}
                stylesheet={this.props.style}
                onLinkPress={this._onLinkPress.bind(this)}
                renderNode={this._renderNode}
                />
        )
    }

}

module.exports = HtmlContent
