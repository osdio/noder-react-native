// Require module
var React = require('react-native')

var moment = require('moment')
var { Icon } = require('react-native-icons')


// Component module
var HtmlContent = require('../components/htmlRender/HtmlContent')
var Return = require('../components/overlay/Return')
var CommentOverlay = require('../components/overlay/CommentOverlay')
var LikeIcon = require('../components/LikeIcon')


// Config module
var config = require('../configs/config')


// Util module
var genColor = require('../util/genColor')
var TopicService = require('../services/TopicService')
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
    ActivityIndicatorIOS,
    TouchableOpacity,
    TouchableHighlight,
    Navigator
    } = React;


var topicHeaderHeight = 100;
var topicAuthorWidth = 100;
var headerPaddingTop = 20;
var authorImgHeight = 40;
var contentPadding = 15;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: 'white',
        height: height
    },
    header: {
        //height: topicHeaderHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'red',
        flexDirection: 'row',
        //paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20
    },
    authorTouchable: {
        //width: topicAuthorWidth,
        //backgroundColor: 'rgba(0,0,0,0.6)'
    },
    authorWrapper: {
        //height: topicHeaderHeight - headerPaddingTop,
        width: topicAuthorWidth - 40,
        //backgroundColor: 'blue',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    authorImg: {
        width: authorImgHeight,
        height: authorImgHeight,
        borderRadius: authorImgHeight / 2
    },
    author: {
        paddingBottom: 12,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12
    },
    titleWrapper: {
        width: width - topicAuthorWidth - 20,
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 20
    },
    title: {
        color: 'rgba(255,255,255,0.9)',
        width: width - topicAuthorWidth - 20,
        justifyContent: 'flex-end',
        flex: 1,
        lineHeight: 1.2 * 16
    },
    titleFooter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 20
    },
    date: {
        width: 100,
        flexDirection: 'row',
    },
    dateText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12
    },
    dateIcon: {
        width: 12,
        height: 16,
        marginRight: 8
    },
    like: {
        width: 20,
        flexDirection: 'row',
    },
    likeIcon: {
        width: 20,
        height: 16,
        marginRight: 8
    },
    content: {
        paddingRight: contentPadding,
        paddingLeft: contentPadding,
        paddingTop: contentPadding,
        paddingBottom: contentPadding,
        backgroundColor: 'white'
    },

})


class Topic extends Component {
    constructor(props) {
        super(props)
        this.headerColor = genColor()
        this.state = {
            likedLoading: false,
            topic: this.props.topic,
            isLoading: false,
            didFocus: false
        }
    }


    componentDidMount() {
        if (this.props.from == 'user') {
            return this._fetchTopic(this.state.topic.id)
        }

        if (this.props.from == 'html') {
            return this._fetchTopic(this.props.topicId)
        }
    }


    componentDidFocus() {
        this.setState({
            didFocus: true
        })
    }


    _fetchTopic(id) {
        this.setState({
            isLoading: true
        })
        TopicService.req.getTopicById(id)
            .then(topic=> {
                this.setState({
                    isLoading: false,
                    topic: topic
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


    _onCommentOverlayPress() {
        this.props.router.toComments({
            topic: this.props.topic,
            from: 'topic'
        })
    }


    _onAuthorImgPress(authorName) {
        this.props.router.toUser({
            userName: authorName
        })
    }


    _renderContent(content) {
        if (this.state.didFocus && content) {
            return (
                <HtmlContent
                    router={this.props.router}
                    content={content}></HtmlContent>
            )
        }


        return (
            <ActivityIndicatorIOS
                size="large"
                animating={true}
                style={{marginTop:20,width:width}}/>
        )
    }


    render() {
        var topic = this.state.topic


        if (topic) {
            var domain = config.domain

            var imgUri = domain + topic.author.avatar_url
            var authorName = topic.author.loginname
            var date = moment(topic.create_at).startOf('minute').fromNow()
            var likeIcon = (
                <LikeIcon
                    topic={topic}
                    style={styles.likeIcon}
                    user={this.props.state.user}
                    actions={this.props.actions}
                    ></LikeIcon>
            )
            return (
                <View style={[styles.container]}>
                    <ScrollView>
                        <View style={[styles.header,{backgroundColor: this.headerColor}]}>
                            <View style={styles.authorTouchable}>
                                <View style={styles.authorWrapper}>
                                    <TouchableOpacity
                                        onPress={this._onAuthorImgPress.bind(this, authorName)}>
                                        <Image
                                            source={{uri:imgUri}}
                                            style={styles.authorImg}>
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>
                                    {topic.title}
                                </Text>

                                <View style={styles.titleFooter}>
                                    <View style={styles.date}>
                                        <Icon
                                            name='ion|clock'
                                            size={12}
                                            color='rgba(255,255,255,0.5)'
                                            style={styles.dateIcon}
                                            />
                                        <Text style={styles.dateText}>
                                            {date}
                                        </Text>
                                    </View>

                                    <View style={styles.like}>
                                        {this.props.user ? likeIcon : null}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.content}>
                            {this._renderContent(topic.content)}
                        </View>
                    </ScrollView>
                    <Return router={this.props.router}/>
                    <CommentOverlay
                        onPress={this._onCommentOverlayPress.bind(this)}
                        topic={topic}/>
                </View>
            )
        }

        return (
            <View style={styles.container}></View>
        )

    }
}


module.exports = Topic;
