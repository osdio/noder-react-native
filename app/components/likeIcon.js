var React = require('react-native')
var { Icon, } = require('react-native-icons')

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
        var userInfo = this.props.user
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
        var userInfo = nextProps.user
        var isLiked
        if (userInfo && userInfo.collect_topics) {
            isLiked = this._isLiked(userInfo.collect_topics)
        }
        this.setState({
            isLiked: isLiked
        })
    }


    _isLiked(collections) {
        var id = this.props.topic.id
        return collections.some(function (item) {
            return item.id == id
        })
    }


    _onLikedPress() {
        if (!this.props.user || this.state.isLoading) {
            return
        }
        this.setState({
            isLoading: true
        })

        let topic = this.props.topic


        topicService.req.markTopicAsLike(topic.id, this.props.user.token, this.state.isLiked)
            .then(() => {
                let actions = this.props.actions
                let likeTopic = actions.likeTopic
                let unLikeTopic = actions.unLikeTopic

                !this.state.isLiked ? likeTopic(topic) : unLikeTopic(topic.id)

                this.setState({
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
