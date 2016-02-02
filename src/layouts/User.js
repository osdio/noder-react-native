import React,{
	Component,
	View,
	Dimensions,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicatorIOS,
	LayoutAnimation
} from 'react-native';
import moment from 'moment';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { parseImgUrl, link, genColor } from '../utils';


const { height, width } = Dimensions.get('window');


class User extends Component {
	constructor(props) {
		super(props);
		const { user={}, userName } = this.props;
		let userInfo = user.publicInfo || {};
		this.isClientUser = userInfo.loginname === userName;
		this.wallColor = genColor();
	}


	componentDidMount() {
		const { actions, user } = this.props;
		actions.updateClientUserInfo(user.secret.loginname);
	}


	componentDidFocus(){
		console.log('focus');
	}


	componentWillReceiveProps(nextProps) {
		if (!this.isClientUser && !nextProps.otherUser) {
			this.props.router.pop();
		}
	}


	_onGithubPress(name) {
		if (name == '' || !name) return;
		link('https://github.com/' + name);
	}


	_renderUserTopics(userInfo) {
		let recentReplies = userInfo.recent_replies
		let recentTopics = userInfo.recent_topics
		if (this.state.didFocus) {
			return (
				<View style={styles.list}>
					<ScrollableTabView
						edgeHitWidth={(width/3)*2}
						renderTabBar={()=><TabBar></TabBar>}>
						<UserTopicPage
							router={this.props.router}
							style={styles.userTopicPage}
							data={recentReplies}
							tabLabel="最近回复"/>
						<UserTopicPage
							router={this.props.router}
							style={styles.userTopicPage}
							data={recentTopics}
							tabLabel="最近发布"/>
					</ScrollableTabView>
				</View>
			)
		}

		if (this.props.isLoginUser) {
			return (
				<ActivityIndicatorIOS
					hidesWhenStopped={true}
					size="large"
					animating={true}
					style={styles.loading}/>
			)
		}

	}


	render() {
		const { user={}, ui } = this.props;
		const userInfo = this.isClientUser ? user.publicInfo : user.otherUser;


		// 如果访问的不是登陆用户的信息
		if (!this.isClientUser && ui.otherUserPending) {
			return (
				<View style={styles.container}>
					<ActivityIndicatorIOS
						hidesWhenStopped={true}
						size="large"
						animating={true}
						style={styles.loading}/>
				</View>
			);
		}


		// 如果用户信息获取失败
		if (!userInfo) {
			return (
				<View style={styles.container}>
					<View>
						<Text>
							网络出错啦, 请点击按钮重新加载
						</Text>
					</View>
				</View>
			)
		}


		return (
			<View style={styles.container}>
				<View style={[styles.bgWall,{backgroundColor:this.wallColor}]}>
					<View style={styles.imgRow}>
						<TouchableOpacity
							onPress={this._onGithubPress.bind(this, userInfo.githubUsername)}>
							<Image
								style={styles.authorImg}
								source={{uri:parseImgUrl(userInfo.avatar_url)}}>
							</Image>
						</TouchableOpacity>
					</View>


					<TouchableOpacity
						onPress={this._onGithubPress.bind(this, userInfo.loginname)}>
						<Text style={styles.github}>
							{userInfo.loginname}
						</Text>
					</TouchableOpacity>


					<View style={styles.bgWallFooter}>
						<Text style={styles.bgWallFooterText}>
							{'注册时间: ' + moment(userInfo.create_at).format('l')}
						</Text>

						<Text style={styles.bgWallFooterText}>
							{'积分:' + userInfo.score}
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

const bgWallHeight = 160;
const authorWrapperHeight = 100;
const authorImgSize = 60;
const fontColor = 'rgba(255,255,255,0.7)';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	loading: {
		flex: 1,
		width: width
	},
	bgWall: {
		height: bgWallHeight,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 30,
		paddingBottom: 10
	},
	imgRow: {
		width: width,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	icon: {
		width: 30,
		height: authorImgSize
	},
	authorWrapper: {
		height: authorWrapperHeight,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	authorImg: {
		height: authorImgSize,
		width: authorImgSize,
		borderRadius: authorImgSize / 2
	},
	bgWallFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: width
	},
	bgWallFooterText: {
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 12,
		color: 'rgba(255,255,255,0.6)'
	},
	github: {
		color: fontColor
	},
	userTopicPage: {
		height: height - bgWallHeight - 70
	},
	list: {
		width: width
	}

});


export const LayoutComponent = User;
export function mapStateToProps(state) {
	return {
		user: state.user,
		ui: state.userUI
	}
}
