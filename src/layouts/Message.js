import React, {
	View,
	Component,
	StyleSheet,
	Dimensions
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/TabBar';
import Return from '../components/base/Return';
import MarkAsReadOverlay from '../components/MarkAsReadOverlay';
import MessageList from '../components/MessageList';


const { height, width } = Dimensions.get('window');


class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			didFocus: false
		}
	}


	componentDidMount() {
		this.props.actions.getMessageList();
	}


	componentDidFocus(haveFocused) {
		if (!haveFocused) {
			this.setState({
				didFocus: true
			});
		}
	}


	render() {
		const { fetchMessagesPending, hasNotRead, hasRead, isMarkAsReadLoading } = this.props;


		return (
			<View style={styles.container}>
				<ScrollableTabView
					edgeHitWidth={(width/3)*2}
					renderTabBar={()=><TabBar/>}>
					<MessageList
						router={this.props.router}
						didFocus={ this.state.didFocus }
						pending={ fetchMessagesPending }
						data={ hasNotRead }
						style={styles.userTopicPage}
						tabLabel={ "未读消息 " + hasNotRead.length }/>
					<MessageList
						router={this.props.router}
						didFocus={ this.state.didFocus }
						pending={ fetchMessagesPending }
						data={ hasRead }
						style={styles.userTopicPage}
						tabLabel={"已读消息 " + hasRead.length}/>
				</ScrollableTabView>

				<Return router={this.props.router}/>
				<MarkAsReadOverlay
					pending={isMarkAsReadLoading}
					markAsRead={this.props.actions.markAsRead}
					hasNotRead={hasNotRead}/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: height,
		paddingTop: 20
	}
});


export const LayoutComponent = Message;
export function mapStateToProps(state) {
	return {
		...state.message,
		...state.messageUI
	}
}
