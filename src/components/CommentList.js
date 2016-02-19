import React,{
	Component,
	Dimensions,
	View,
	Text,
	PropTypes,
	ListView,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import CommentHtml from './CommentHtml';
import CommentUp from './CommentUp';

import { parseImgUrl } from '../utils';


const { height, width } = Dimensions.get('window');


class CommentList extends Component {
	static propTypes = {
		data: PropTypes.array,
		focusedReply: PropTypes.string,
		router: PropTypes.object,
		user: PropTypes.object,
		onReplyPress: PropTypes.func,
		onAuthorNamePress: PropTypes.func
	};


	static defaultProps = {
		onReplyPress: ()=>null,
		onAuthorNamePress: ()=>null
	};


	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds: ds.cloneWithRows(props.data)
		};
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState({
				ds: this.state.ds.cloneWithRows(nextProps.data)
			})
		}
	}


	_renderFooter(comment, authorName) {
		if (this.props.user) {
			return (
				<View style={styles.commentFooter}>
					<CommentUp
						replyId={comment.id}
						authorName={authorName}
						ups={comment.ups}
						user={this.props.user}
						style={styles.up}
					/>
					<TouchableOpacity
						onPress={ ()=> this.props.onReplyPress(comment.id, authorName) }>
						<Icon
							name={'reply'}
							size={22}
							color='rgba(0,0,0,0.35)'
							style={styles.replyIcon}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}


	_renderRow(comment, sectionID, rowID, highlightRow) {
		const authorName = comment.author.loginname;
		const date = moment(comment.create_at).startOf('minute').fromNow();
		const commentNum = this.props.data.length - parseInt(rowID);
		let focusStyle = {};
		if (this.props.focusedReply) {
			let replyId = this.props.focusedReply.id;
			if (replyId == comment.id) {
				focusStyle = {
					backgroundColor: 'rgba(0,2,125,0.07)'
				}
			}
		}


		return (
			<View
				ref={view=>this[comment.id]=view}
				key={comment.id}
				style={[styles.commentWrapper,focusStyle]}>
				<View style={[styles.imageWrapper]}>
					<TouchableOpacity onPress={()=>{
						this.props.router.toUser({
							userName: authorName
						})
					}}>
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
							<TouchableOpacity onPress={()=> this.props.onAuthorNamePress(authorName)}>
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

					{ this._renderFooter(comment, authorName) }
				</View>
			</View>
		)
	}


	render() {
		return (
			<ListView
				ref={view=>this._listView=view}
				style={{backgroundColor:'rgba(255,255,255,1)'}}
				showsVerticalScrollIndicator={true}
				initialListSize={10}
				pagingEnabled={false}
				removeClippedSubviews={true}
				dataSource={this.state.ds}
				renderRow={this._renderRow.bind(this)}
			/>
		)
	}
}

const authorImgSize = 35;
const commentContentOffset = 15 * 2 + authorImgSize;
const commentIconSize = 12;


const commentHtmlStyle = StyleSheet.create({
	img: {
		width: width - commentContentOffset - 15,
		height: width - commentContentOffset - 15,
		resizeMode: Image.resizeMode.contain
	}
});


const styles = StyleSheet.create({
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
});


export default CommentList;
