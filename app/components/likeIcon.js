var React = require('react-native')
var Icon = require('FAKIconImage')

var topicService = require('../services/topicService');


var {
    View,
    Component,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicatorIOS
    } = React


class LikeIcon extends Component {
    constructor(props) {
        super(props)
        var userInfo = this.props.userInfo
        var isLiked
        if (userInfo && userInfo.collect_topics) {
            isLiked = this._isLiked(userInfo.collect_topics)
        }
        this.state = {
            isLoading: false,
            isLiked: isLiked
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo !== this.props.userInfo) {
            var userInfo = nextProps.userInfo
            var isLiked
            if (userInfo && userInfo.collect_topics) {
                isLiked = this._isLiked(userInfo.collect_topics)
            }
            this.setState({
                isLiked: isLiked
            })
        }
    }


    _isLiked(collections) {
        var id = this.props.topic.id
        return collections.some(function (item) {
            return item.id == id
        })
    }


    _removeTopicFromCollections(collections, topic) {
        var index
        for (var i = 0; i < collections.length; i++) {
            if (collections[i].id == topic.id) {
                index = i
            }
        }
        if (index) {
            collections.splice(index, 1)
        }

    }


    _setMessage(topic, isLiked) {
        var userInfo = this.props.userInfo

        if (isLiked) {
            userInfo.collect_topics.push(topic)
        }
        else {
            this._removeTopicFromCollections(userInfo.collect_topics, topic)
        }


        global.__message__ = {
            topic_to_home: {
                userInfo: userInfo
            }
        }
    }


    _onLikedPress() {
        if (!this.props.user || this.state.isLoading) {
            return
        }
        this.setState({
            isLoading: true
        })


        topicService.req.markTopicAsLike(this.props.topic.id, this.props.user.token, this.state.isLiked)
            .then(() => {
                let isLiked = !this.state.isLiked
                this._setMessage(this.props.topic, isLiked)

                this.setState({
                    isLiked: isLiked,
                    isLoading: false
                })
            })
            .catch(err => {
                console.warn(err)
                this.setState({
                    isLoading: false
                })
            })
            .done()
    }


    _renderIcon() {
        let userInfo = this.props.userInfo


        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicatorIOS
                        color='rgba(255,255,255,0.8)'
                        style={[this.props.style]}
                        ></ActivityIndicatorIOS>
                </View>
            )
        }
        return (
            <Icon
                name={this.state.isLiked ? 'ion|ios-heart' : 'ion|ios-heart-outline'}
                size={20}
                color='rgba(255,255,255,0.99)'
                style={this.props.style}
                />
        )
    }


    render() {
        return (
            <TouchableOpacity
                onPress={this._onLikedPress.bind(this)}>
                {this._renderIcon()}
            </TouchableOpacity>
        )
    }
}


module.exports = LikeIcon
