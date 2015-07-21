var React = require('react-native')

var HtmlRender = require('react-native-html-render')

var window = require('../../util/window')


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


var regs = {
    http: {
        topic: /^https?:\/\/cnodejs\.org\/topic\/\w*/,
        user: /^https?:\/\/cnodejs\.org\/user\/\w*/
    }
}


class HtmlContent extends Component {
    constructor(props) {
        super(props)
    }


    _onLinkPress(url) {
        let router = this.props.router

        if (/^\/user\/\w*/.test(url)) {
            let authorName = url.replace(/^\/user\//, '')

            router.toUser({
                userName: authorName
            })
        }

        if (/^https?:\/\/.*/.test(url)) {
            if (regs.http.topic.test(url)) {
                let topicId = url.replace(/^https?:\/\/cnodejs\.org\/topic\//, '')

                return router.toTopic({
                    topicId: topicId,
                    from: 'html'
                })
            }

            if (regs.http.user.test(url)) {
                let userName = url.replace(/^https?:\/\/cnodejs\.org\/user\//, '')

                return router.toUser({
                    userName: userName
                })
            }

            window.link(url)
        }

        if (/^mailto:\w*/.test(url)) {
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
