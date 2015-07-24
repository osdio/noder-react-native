var React = require('react-native')
var { Icon } = require('react-native-icons')

var TopicService = require('../../services/TopicService')

var {
    Component,
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicatorIOS
    } = React


class CommentUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUped: this._isUped(this.props.user.id, this.props.ups),
            isLoading: false,
            count: this.props.ups.length
        }
    }


    _onUpPress() {
        if (this.state.isLoading) return

        this.setState({
            isLoading: true
        })

        TopicService.req.upComment(this.props.replyId, this.props.user.token)
            .then(isUped=> {
                let count = this.state.count
                isUped ? count++ : count--
                this.setState({
                    isUped: isUped,
                    isLoading: false,
                    count: count < 0 ? 0 : count
                })
            })
            .catch(err=> {
                console.warn(err)
                this.setState({
                    isLoading: false
                })
            })
            .done()
    }


    _isUped(id, ups) {
        return ups.some(item=> {
            return item == id
        })
    }


    _renderUpIcon() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicatorIOS
                    size='small'
                    style={styles.loading}
                    ></ActivityIndicatorIOS>
            )
        }
        return (
            <Icon
                name={'ion|thumbsup'}
                size={20}
                color={this.state.isUped ? '#3498DB':'rgba(0,0,0,0.2)'}
                style={styles.upIcon}
                />
        )
    }


    render() {
        let count = this.state.count || 0
        return (
            <TouchableOpacity
                onPress={this._onUpPress.bind(this)}>
                <View style={this.props.style}>

                    {this._renderUpIcon()}

                    {count == 0 ? null : (<Text style={styles.text}>{count}</Text>)}
                </View>
            </TouchableOpacity>
        )
    }
}


var styles = StyleSheet.create({
    upIcon: {
        height: 12,
        width: 16
    },
    text: {
        paddingLeft: 7,
        fontSize: 12,
        color: 'rgba(0,0,0,0.2)',
        height: 12
    },
    loading: {
        height: 12,
        width: 16
    }
})


module.exports = CommentUp
