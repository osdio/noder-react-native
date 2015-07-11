var React = require('react-native');
var window = require('../../util/window');
var { width, height } = window.get();
var precomputeStyle = require('precomputeStyle');


var moment = require('moment');
var Icon = require('FAKIconImage');
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;
var markdown = require("markdown").markdown;

var HtmlContent = require('../htmlRender/htmlContent');
var Return = require('../overlay/return');
var CommentOverlay = require('../overlay/commentOverlay');
var CommentHtml = require('../htmlRender/commentHtml');
var Storage = require('../../util/storage');

var topicService = require('../../services/topicService');

var genColor = require('../../util/genColor');
var config = require('../../configs/config');
var animations = require('../../util/animation');
var sceneConfig = require('../../configs/config')
var routes = require('../../configs/routes')


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
    } = React


class CommentListView extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var data = [];
        this.state = {
            ds: ds.cloneWithRows(data),
            commentLoading: false,
            user: null,
            textInput: null,
            replyUploading: false,
            isLoaded: false,
            didFocus: false
        }
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
    }

    _renderRow(comment, sectionID, rowID, highlightRow) {
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


    render() {
        return (
            <View
                ref={view=>this.commentsView=view}
                style={[styles.comments]}>
                <ListView
                    ref={view => this._listView = view}
                    style={{backgroundColor:'rgba(255,255,255,1)'}}
                    showsVerticalScrollIndicator={true}
                    initialListSize={10}
                    pagingEnabled={false}
                    removeClippedSubviews={true}
                    dataSource={this.state.ds}
                    renderRow={this._renderRow.bind(this)}
                    />
            </View>
        )
    }
}


module.exports = CommentListView
