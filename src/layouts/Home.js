import React, {
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
import * as TopicListComponent from './TopicList';
import * as Tabs from '../constants/Tabs';
import connectComponent from '../utils/connectComponent';


const TopicList = connectComponent(TopicListComponent);
const {height, width} = Dimensions.get('window');


class Home extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		this.props.actions.updateTopicsByTab('all');
	}


	_onPageChanged(page) {
		const {actions, topic} = this.props;
		const tab = Tabs.tabs[page];
		if (topic[tab] && !topic[tab].length) {
			actions.updateTopicsByTab(tab);
		}
	}


	_renderTopicList() {
		return ['good', 'ask', 'all', 'share', 'job'].map((item)=> {
			return (
				<TopicList router={this.props.router}
						   key={item}
						   tab={item}/>
			);
		});
	}


	render() {
		const {router, user, message} = this.props;
		return (
			<View style={styles.container}>
				<ScrollableTabs
					index={0}
					tabs={['精华', '问答', '主页', '分享', '招聘']}
					onPageChanged={this._onPageChanged.bind(this)}
				>
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
