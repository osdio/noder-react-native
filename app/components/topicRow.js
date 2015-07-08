var React = require('react-native')
var moment = require('moment')


var config = require('../config/config')

var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    StatusBarIOS,
    Image,
    ListView,
    TouchableHighlight,
    Navigator,
    } = React


class TopicRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let topic = this.props.topic
        let authorImgUri = config.domain + topic.author.avatar_url
        var title = topic.title;
        var titleLength = Math.floor((width - 100) / 15) + 2;
        if (title.length > titleLength) {
            title = title.substring(0, titleLength - 3) + '...';
        }
        return (
            <TouchableHighlight
                onPress={()=>{this.props.onPress(topic)}}
                underlayColor='#3498DB'
                key={topic.id}>
                <View style={styles.row}>
                    <View style={styles.imgWrapper}>
                        <Image
                            style={styles.img}
                            source={{uri:authorImgUri}}
                            >
                        </Image>
                    </View>

                    <View style={[styles.topic]}>
                        <Text style={[styles.title]}>
                            {title}
                        </Text>

                        <View style={[styles.topicFooter]}>

                            {this.props.footer}

                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}


var styles = StyleSheet.create({
    "row": {
        "height": 90,
        "flexDirection": "row",
        "borderBottomColor": "rgba(0, 0, 0, 0.02)",
        "borderBottomWidth": 1,
        "paddingTop": 25,
        "paddingRight": 0,
        "paddingBottom": 25,
        "paddingLeft": 20
    },
    "imgWrapper": {
        "width": 90,
        "position": "absolute",
        "left": 20,
        "top": 25,
        "height": 65
    },
    "img": {
        "height": 40,
        "width": 40,
        "borderRadius": 20
    },
    "topic": {
        "marginLeft": 60,
        width: width - 100
    },
    "title": {
        "fontSize": 15
    },
    "topicFooter": {
        "marginTop": 12,
        "flexDirection": "row"
    }
})


module.exports = TopicRow
