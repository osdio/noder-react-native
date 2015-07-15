var React = require('react-native');
var window = require('../util/window');
var { width, height } = window.get();
var precomputeStyle = require('precomputeStyle');


var moment = require('moment');
var { Icon, } = require('react-native-icons')
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;
var markdown = require("markdown").markdown;

var HtmlContent = require('../components/htmlRender/htmlContent');
var Return = require('../components/overlay/return');
var CommentOverlay = require('../components/overlay/commentOverlay');
var CommentHtml = require('../components/htmlRender/commentHtml');
var Storage = require('../util/storage');

var topicService = require('../services/topicService');

var genColor = require('../util/genColor');
var config = require('../configs/config');
var animations = require('../util/animation');
var sceneConfig = require('../configs/sceneConfig')
var routes = require('../configs/routes')

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
    Navigator,
    PushNotificationIOS,
    TextInput,
    LayoutAnimation
    } = React;

var navHeight = 55
var authorImgSize = 35
var commentContentOffset = 15 * 2 + authorImgSize
var commentIconSize = 12
var replyFormHeight = 55
var commentsHeight = height - 40 - 20 - replyFormHeight
var submitButtonWidth = 55


var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height
    },
    nav: {
        height: navHeight,
        width: width,
        borderBottomColor: 'rgba(0,0,0,0.03)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    navReturn: {
        height: navHeight,
        position: 'absolute',
        left: 0,
        top: 0,
        paddingLeft: 15,
        paddingRight: 15
    },

    navToTopic: {
        height: navHeight,
        position: 'absolute',
        right: 0,
        top: 0,
        paddingLeft: 15,
        paddingRight: 15
    },
    navReturnText: {
        lineHeight: navHeight - 20,
        fontSize: 16
    },

    titleText: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: 16
    },

    countText: {
        color: 'rgba(0,0,0,0.45)'
    },

    comments: {
        //marginTop: 20,
        width: width,
        height: commentsHeight
    },

    commentWrapper: {
        borderBottomColor: 'rgba(0,0,0,0.02)',
        borderBottomWidth: 1,
        padding: 15,
        flexDirection: 'row',
    },

    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    date: {
        flexDirection: 'row',
        flex: 1
    },

    author: {
        flex: 1
    },
    authorText: {
        color: 'rgba(0,0,0,0.3)',
        fontSize: 12
    },

    dateIcon: {
        height: commentIconSize,
        width: commentIconSize,
        flexDirection: 'row'
    },

    dateText: {
        color: 'rgba(0,0,0,0.3)',
        fontSize: 12,
        textAlign: 'right',
        flex: 1
    },

    commentIcon: {
        height: commentIconSize,
        width: commentIconSize
    },


    imageWrapper: {
        width: authorImgSize + 15
    },

    commentNumText: {
        marginTop: 15,
        fontSize: 12,
        color: 'rgba(0,0,0,0.3)',
        textAlign: 'center',
        width: authorImgSize

    },

    commentContentWrapper: {
        width: width - commentContentOffset - 15,
    },

    authorImg: {
        height: authorImgSize,
        width: authorImgSize,
        borderRadius: authorImgSize / 2

    },
    commentFooter: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 15
    },
    up: {
        width: 80
    },
    replyIcon: {
        height: 12,
        width: 15
    },
    upIcon: {
        height: 10,
        width: 13
    },
    replyFormWrapper: {
        height: replyFormHeight + 4,
        width: width,
        flexDirection: 'row',
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {
            width: -2,
            height: -2
        },
        shadowOpacity: 0.1,
        alignItems: 'center'
    },
    replyUserImgWrapper: {
        width: authorImgSize + 15 * 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    userImg: {
        height: authorImgSize,
        width: authorImgSize,
        resizeMode: Image.resizeMode.contain,
    },
    replyInputWrapper: {
        width: width - replyFormHeight - submitButtonWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    replyInput: {
        flex: 1,
        fontSize: 14,
        height: 14 * 2,
        lineHeight: 14 * 1.4
    },
    submitIcon: {
        width: authorImgSize,
        height: authorImgSize
    }
})


var commentHtmlStyle = StyleSheet.create({
    img: {
        width: width - commentContentOffset - 15,
        height: width - commentContentOffset - 15,
        resizeMode: Image.resizeMode.contain
    }
})


class Comments extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var data = [];
        this.state = {
            ds: ds.cloneWithRows(data),
            commentLoading: false,
            textInput: null,
            replyUploading: false,
            isLoaded: false,
            didFocus: false
        }
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
    }

    updateKeyboardSpace(frames) {
        LayoutAnimation.configureNext(animations.keyboard.layout.spring);
        this.commentsView.setNativeProps({
            height: commentsHeight - frames.end.height
        })
    }

    resetKeyboardSpace() {
        LayoutAnimation.configureNext(animations.keyboard.layout.spring);
        this.commentsView.setNativeProps({
            height: commentsHeight
        })
    }


    componentDidMount() {
        this.flag = 0
        this._fetchComment()
        KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace)
        KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace)
    }


    componentDidFocus() {
        this.setState({
            didFocus: true
        })
    }


    componentWillUnmount() {
        KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace)
        KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace)
    }


    componentDidUpdate() {
        //this._scrollToReply()
    }


    _scrollToReply() {
        let reply = this.props.reply
        if (reply && this.flag == 1) {
            let row = this[reply.id]
            if (row && row.measure) {
                row.measure((x, y, width, height, pageX, pageY) => {
                    this._listView.setNativeProps({
                        contentOffset: {
                            x: 0,
                            y: y
                        }
                    })
                })

                row.setNativeProps(precomputeStyle({
                    styles: {
                        backgroundColor: 'red'
                    }
                }))
            }
        }
    }


    _fetchComment() {
        if (this.state.commentLoading) {
            return
        }

        this.setState({
            commentLoading: true
        })
        topicService.req.getTopicById(this.props.topic.id)
            .then(topic=> {
                this.topic = topic
                return topic.replies
            })
            .then(replies=> {
                return replies.reverse()
            })
            .then(comments=> {
                this.comments = comments
                this.setState({
                    ds: this.state.ds.cloneWithRows(this.comments),
                    commentLoading: false,
                    isLoaded: true
                })
            })
            .catch((err)=> {
                console.warn(err)
                this.setState({
                    commentLoading: false
                })
            })
            .done()
    }


    _doReply() {
        if (this.state.replyUploading || this.state.textInput == '' || this.state.textInput == null) {
            return
        }
        let user = this.props.user
        let topic = this.props.topic
        let content = this.state.textInput + config.replySuffix

        this.setState({
            replyUploading: true
        })


        topicService.req.reply(topic.id, content, user.token, this.replyId)
            .then(replyId=> {
                var newReply = {
                    id: replyId,
                    author: {
                        loginname: user.loginname,
                        avatar_url: user.avatar_url
                    },
                    content: markdown.toHTML(content),
                    ups: [],
                    create_at: new Date()
                }
                this.comments = [newReply].concat(this.comments)
                this.replyId = null
                this.setState({
                    ds: this.state.ds.cloneWithRows(this.comments),
                    textInput: '',
                    replyUploading: false
                })
                this.textInput.blur()
            })
            .catch(err=> {
                console.warn(err)
                this.setState({
                    replyUploading: false
                })
            })
            .done()
    }


    _onReplyPress(id, authorName) {
        this.textInput.focus()
        this.setState({
            textInput: `@${authorName} `
        })
        this.replyId = id
    }


    _onAuthorTextPress(authorName) {
        let textInput = this.state.textInput || ''

        this.setState({
            textInput: textInput + ` @${authorName} `
        })
    }


    _onSubmitPress() {
        this._doReply()
    }


    _onReturnPress() {
        Navigator.getContext(this).pop()
    }


    _onReturnToTopic() {
        var Topic = require('../scene/topic')
        Navigator.getContext(this).push({
            component: Topic,
            sceneConfig: sceneConfig.customFloatFromRight,
            name: 'topic',
            props: {
                topic: this.topic
            }
        })
    }


    _onAuthorImgPress(authorName) {
        routes.toUser(this, {
            userName: authorName
        })
    }


    _onUpPress() {

    }


    _onCommentTitlePress() {
        this._listView.setNativeProps({
            contentOffset: {
                x: 0,
                y: 0
            }
        })
    }


    renderRow(comment, sectionID, rowID, highlightRow) {
        var authorName = comment.author.loginname
        var domain = config.domain
        var date = moment(comment.create_at).startOf('minute').fromNow();
        var commentNum = this.comments.length - parseInt(rowID)
        var focusStyle = {}
        if (this.props.reply) {
            let replyId = this.props.reply.id
            //console.log(replyId == comment.id);
            if (replyId == comment.id) {
                focusStyle = {
                    backgroundColor: 'rgba(0,2,125,0.07)'
                }
            }
        }

        var footer = (
            <View style={styles.commentFooter}>
                <View style={styles.up}>
                    <TouchableOpacity
                        onPress={this._onUpPress.bind(this,comment.id)}>
                        <Icon
                            name={'ion|thumbsup'}
                            size={20}
                            color='rgba(0,0,0,0.2)'
                            style={styles.upIcon}
                            />
                    </TouchableOpacity>
                </View>

                <View style={styles.reply}>
                    <TouchableOpacity
                        onPress={this._onReplyPress.bind(this, comment.id, authorName)}>
                        <Icon
                            name={'ion|reply'}
                            size={20}
                            color='rgba(0,0,0,0.35)'
                            style={styles.replyIcon}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        )


        return (
            <View
                ref={view=>this[comment.id]=view}
                key={comment.id}
                style={[styles.commentWrapper,focusStyle]}>
                <View style={[styles.imageWrapper]}>
                    <TouchableOpacity onPress={this._onAuthorImgPress.bind(this,authorName)}>
                        <Image
                            style={styles.authorImg}
                            source={{uri:domain + comment.author.avatar_url}}
                            >
                        </Image>
                    </TouchableOpacity>

                    <Text style={styles.commentNumText}>
                        {commentNum} 楼
                    </Text>
                </View>

                <View style={styles.commentContentWrapper}>
                    <View style={styles.commentHeader}>
                        <View style={styles.author}>
                            <TouchableOpacity onPress={this._onAuthorTextPress.bind(this,authorName)}>
                                <Text style={styles.authorText}>
                                    {{authorName}}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.date}>
                            <Text style={styles.dateText}>
                                {date}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.commentContent}>
                        <CommentHtml
                            style={commentHtmlStyle}
                            content={comment.content}/>
                    </View>

                    {!this.props.user || footer}
                </View>
            </View>
        )
    }


    _renderComments() {
        if (this.state.didFocus && this.state.isLoaded) {
            return (
                <ListView
                    ref={view=>this._listView=view}
                    style={{backgroundColor:'rgba(255,255,255,1)'}}
                    showsVerticalScrollIndicator={true}
                    initialListSize={10}
                    pagingEnabled={false}
                    removeClippedSubviews={true}
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                    />
            )
        }

        return (
            <ActivityIndicatorIOS
                size="large"
                animating={true}
                style={{marginTop:20}}/>
        )
    }


    _renderReplySubmiteIcon() {
        if (this.state.replyUploading) {
            return (
                <View>
                    <ActivityIndicatorIOS
                        style={styles.submitIcon}
                        ></ActivityIndicatorIOS>
                </View>
            )
        }
        return (
            <Icon
                name={'ion|reply'}
                size={28}
                color='rgba(0,0,0,0.35)'
                style={styles.submitIcon}
                />
        )
    }


    _renderReplyForm() {
        var user = this.props.user

        if (!user) return null

        var userImg = config.domain + user.avatar_url

        return (
            <View style={styles.replyFormWrapper}>
                <View style={styles.replyUserImgWrapper}>
                    <Image
                        style={styles.userImg}
                        source={{uri: userImg}}/>
                </View>

                <View style={styles.replyInputWrapper}>
                    <TextInput
                        ref={view=>this.textInput=view}
                        value={this.state.textInput}
                        multiline={true}
                        placeholder='嘿，说点啥吧'
                        style={styles.replyInput}
                        onChangeText={(text) => {
                            this.setState({
                                textInput:text
                            })
                        }}
                        />
                </View>

                <View style={styles.submit}>
                    <TouchableOpacity
                        onPress={this._onSubmitPress.bind(this)}>
                        {this._renderReplySubmiteIcon()}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render() {
        var count = this.state.ds.getRowCount()
        var returnToTopic = (
            <TouchableHighlight
                onPress={this._onReturnToTopic.bind(this)}
                underlayColor='rgba(0,0,0,0.1)'
                style={styles.navToTopic}>
                <Text style={styles.navReturnText}>
                    正文
                </Text>
            </TouchableHighlight>
        )

        return (
            <View style={styles.container}>
                <View
                    ref={view=>this.nav=view}
                    style={styles.nav}>
                    <TouchableHighlight
                        onPress={this._onReturnPress.bind(this)}
                        underlayColor='rgba(0,0,0,0.1)'
                        style={styles.navReturn}>
                        <Text style={styles.navReturnText}>
                            返回
                        </Text>
                    </TouchableHighlight>

                    <TouchableOpacity
                        onPress={this._onCommentTitlePress.bind(this)}
                        style={styles.navTitle}>
                        <Text style={styles.titleText}>
                            评论
                            <Text style={styles.countText}>
                                {' ' + count.toString()}
                            </Text>
                        </Text>
                    </TouchableOpacity>

                    {
                        (this.state.didFocus && this.props.reply && this.state.isLoaded) ? returnToTopic : null
                    }

                </View>

                <View
                    ref={view=>this.commentsView=view}
                    style={[styles.comments,{height:this.props.user?commentsHeight:commentsHeight+replyFormHeight}]}>
                    {this._renderComments()}
                </View>

                {this._renderReplyForm()}
            </View>
        )
    }
}

module.exports = Comments
