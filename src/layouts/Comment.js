import React, {
	View,
	StyleSheet,
	Component,
	Text,
	Image,
	ListView,
	TouchableOpacity,
	TextInput,
	LayoutAnimation,
	Dimensions,
	DeviceEventEmitter,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { markdown } from 'markdown'
import Return from '../components/base/Return';
import CommentHtml from '../components/CommentHtml';
import CommentUp from '../components/CommentUp';
import Nav from '../components/Nav';
import Spinner from '../components/base/Spinner';
import animations from '../configs/animations';
import { genColor, parseImgUrl } from '../utils';


const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const authorImgSize = 35;
const commentContentOffset = 15 * 2 + authorImgSize;
const commentIconSize = 12;
const replyFormHeight = 55;
const commentsHeight = height - 40 - 20 - replyFormHeight - statusBarHeight;
const submitButtonWidth = 55;


class Comment extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds: ds.cloneWithRows(props.replies),
			didFocus: false
		};
		this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
		this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
	}

	updateKeyboardSpace(e) {
		LayoutAnimation.configureNext(animations.keyboard.layout.spring);
		this.commentsView && this.commentsView.setNativeProps({
			style: {
				height: commentsHeight - e.endCoordinates.height
			}
		})
	}

	resetKeyboardSpace() {
		LayoutAnimation.configureNext(animations.keyboard.layout.spring);
		this.commentsView && this.commentsView.setNativeProps({
			style: {
				height: commentsHeight
			}
		})
	}


	componentDidMount() {
		DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace);
		DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)
	}


	componentDidFocus(haveFocus) {
		if (!haveFocus) {
			this.setState({
				didFocus: true
			})
		}
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.replies !== this.props.replies) {
			this.setState({
				ds: this.state.ds.cloneWithRows(nextProps.replies)
			})
		}
	}


	componentDidUpdate() {
		setTimeout(() => this._scrollToReply());
	}


	_scrollToReply() {
		let reply = this.props.reply;
		if (reply) {
			let row = this[reply.id];
			if (row && row.measure) {
				row.measure((x, y, width, height, pageX, pageY) => {
					this._listView.setNativeProps({
						contentOffset: {
							x: 0,
							y: y
						}
					})
				});

				row.setNativeProps({
					styles: {
						backgroundColor: 'red'
					}
				});
			}
		}
	}


	_onReplyPress(id, authorName) {
		if (!this.props.user) return;
		this.textInput.focus();
		let text = `@${authorName} `;
		this.textInput.setNativeProps({
			text: text
		});
		this.replyId = id;
		this.textInputValue = text
	}


	_onAuthorTextPress(authorName) {
		if (!this.props.user) return;
		let text = (this.textInputValue || '') + ` @${authorName} `;

		this.textInput.setNativeProps({
			text: text
		});
		this.textInputValue = text;
	}


	_onAuthorImgPress(authorName) {
		this.props.router.toUser({
			userName: authorName
		})
	}


	renderRow(comment, sectionID, rowID, highlightRow) {
		var authorName = comment.author.loginname;
		var date = moment(comment.create_at).startOf('minute').fromNow();
		var commentNum = this.props.replies.length - parseInt(rowID);
		var focusStyle = {};
		if (this.props.reply) {
			let replyId = this.props.reply.id;
			if (replyId == comment.id) {
				focusStyle = {
					backgroundColor: 'rgba(0,2,125,0.07)'
				}
			}
		}

		var footer = (
			<View style={styles.commentFooter}>
				<CommentUp
					replyId={comment.id}
					authorName={authorName}
					ups={comment.ups}
					user={this.props.user}
					style={styles.up}
				/>
				<TouchableOpacity
					onPress={this._onReplyPress.bind(this, comment.id, authorName)}>
					<Icon
						name={'reply'}
						size={22}
						color='rgba(0,0,0,0.35)'
						style={styles.replyIcon}
					/>
				</TouchableOpacity>
			</View>
		);


		return (
			<View
				ref={view=>this[comment.id]=view}
				key={comment.id}
				style={[styles.commentWrapper,focusStyle]}>
				<View style={[styles.imageWrapper]}>
					<TouchableOpacity onPress={this._onAuthorImgPress.bind(this,authorName)}>
						<Image
							style={styles.authorImg}
							source={{uri:parseImgUrl(comment.author.avatar_url)}}
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
									{authorName}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.date}>
							<Text style={styles.dateText}>
								{date}
							</Text>
						</View>
					</View>

					<CommentHtml
						router={this.props.router}
						style={commentHtmlStyle}
						content={comment.content}/>

					{!this.props.user || footer}
				</View>
			</View>
		)
	}


	_renderComments(topic) {
		if (this.state.didFocus && topic) {
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
			<Spinner
				size="large"
				animating={true}
				style={{marginTop:20,width:width}}/>
		)
	}


	_renderReplySubmiteIcon() {
		if (this.props.replyPending) {
			return (
				<View>
					<Spinner
						style={styles.submitIcon}
					/>
				</View>
			)
		}
		return (
			<Icon
				name={'reply'}
				size={28}
				color='rgba(0,0,0,0.35)'
				style={styles.submitIcon}
			/>
		)
	}


	_renderReplyForm() {
		const { user } = this.props;
		if (!user) return null;

		const userImg = parseImgUrl(user.avatar_url);

		return (
			<View style={styles.replyFormWrapper}>
				<View style={styles.replyUserImgWrapper}>
					<TouchableOpacity onPress={()=>this.props.router.toUser({
						userName: user.loginname
					})}>
						<Image
							style={styles.userImg}
							source={{uri: userImg}}/>
					</TouchableOpacity>
				</View>

				<View style={styles.replyInputWrapper}>
					<TextInput
						ref={view=>this.textInput=view}
						value={this.state.textInput}
						multiline={true}
						placeholder='嘿，说点啥吧'
						style={styles.replyInput}
						onChangeText={(text) => {
                            this.textInput.setNativeProps({
                                text: text
                            });
                            this.textInputValue = text
                        }}
					/>
				</View>

				<View style={styles.submit}>
					<TouchableOpacity
						onPress={() => this._doReply()}>
						{this._renderReplySubmiteIcon()}
					</TouchableOpacity>
				</View>
			</View>
		)
	}


	render() {
		const { topic, router, id, count } = this.props;
		let navs = {
			Left: {
				text: '返回',
				onPress: ()=> {
					router.pop()
				}
			},
			Center: {
				text: '评论 ' + count,
				onPress: ()=> {
					if (count > 0) {
						this._listView.setNativeProps({
							contentOffset: {
								x: 0,
								y: 0
							}
						})
					}
				}
			}
		};


		if (this.state.didFocus && this.props.reply && topic) {
			navs = {
				...navs,
				Right: {
					text: '正文',
					onPress: ()=> {
						router.toTopic({
							topic: topic,
							id: topic.id
						})
					}
				}
			}
		}

		return (
			<View style={styles.container}>
				<Nav navs={navs}/>

				<View ref={view=>this.commentsView=view}
					  style={[styles.comments,{
					  	height: this.props.user ? commentsHeight : commentsHeight + replyFormHeight
					  }]}>
					{this._renderComments(topic)}
				</View>

				{this._renderReplyForm()}
			</View>
		)
	}
}


const commentHtmlStyle = StyleSheet.create({
	img: {
		width: width - commentContentOffset - 15,
		height: width - commentContentOffset - 15,
		resizeMode: Image.resizeMode.contain
	}
});


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: height
	},

	titleText: {
		color: 'rgba(0,0,0,0.7)',
		fontSize: 16
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
		alignItems: 'flex-end'
	},
	replyIcon: {
		width: 15,
		flex: 1
	},
	upIcon: {
		flex: 1,
		width: 15
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
		borderRadius: authorImgSize / 2
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
		//lineHeight: 14 * 1.4
	},
	submitIcon: {
		width: authorImgSize,
		height: authorImgSize
	}
});


export const LayoutComponent = Comment;
export function mapStateToProps({ user, topic, topicUI }, props) {
	const { id = '0' } = props;
	const topicInfo = topic.topics[id] || props.topic;
	const count = topicInfo && topicInfo.replies && topicInfo.replies.length || 0;
	return {
		count,
		user: user.secret,
		topic: topicInfo,
		loadPending: topicUI.loadPending[id],
		replyPending: topicUI.replyPending[id],
		replies: topicInfo && topicInfo.replies || []
	}
}
