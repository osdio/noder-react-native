import React,{
	Component,
	PropTypes,
	View,
	Text,
	StyleSheet,
	Dimensions,
	Animated,
	Easing,
	StatusBar
} from 'react-native';
import UserOverlay from '../components/UserOverlay';
import MessageOverlay from '../components/MessageOverlay';
import ScrollableTabs from '../components/ScrollableTabs';
import TopicList from '../components/TopicList';
import config from '../configs';


const { height, width } = Dimensions.get('window');


class Home extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		//['good', 'ask', 'all', 'share', 'job'].map((item)=> {
		//	this.props.actions.getTopicsByTab(item);
		//});
	}


	_renderTopicList() {
		return ['good', 'ask', 'all', 'share', 'job'].map((item)=> {
			return <TopicList router={this.props.router} key={item} nav={item} data={this.props.topic[item]}/>
		});
	}


	render() {
		const { router, user, message } = this.props;
		return (
			<View style={styles.container}>
				<ScrollableTabs index={0} tabs={['精华', '问答', '主页', '分享', '招聘']}>
					{ this._renderTopicList() }
				</ScrollableTabs>


				<UserOverlay user={user.secret} toLogin={() => router.toLogin() }
							 toUser={() => router.toUser({
							 	userName: user.publicInfo.loginname
							 })}/>


				<MessageOverlay user={user.secret}
								count={ message.unreadMessageCount }
								toMessage={ () => router.toMessage() }/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		flex: 1
	},
	bg: {
		width,
		height,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
});


export const LayoutComponent = Home;
export function mapStateToProps(state) {
	return {
		user: state.user,
		message: state.message,
		topic: state.topic
	}
}
