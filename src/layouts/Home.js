import React,{
	Component,
	PropTypes,
	View,
	Text,
	StyleSheet,
	Dimensions,
	Animated,
	Easing
} from 'react-native';
import UserOverlay from '../components/UserOverlay';
import MessageOverlay from '../components/MessageOverlay';
import config from '../configs';


const { height, width } = Dimensions.get('window');


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0.4)
		};
	}


	componentDidMount() {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			easing: Easing.quad
		}).start();
	}


	render() {
		const { home, actions, router, user, message } = this.props;
		return (
			<View style={styles.container}>
				<Animated.View
					style={[styles.bg, {opacity: this.state.fadeAnim}]}>

					<Text onPress={()=>{
						this.props.actions.toast('测试');
					}}>
						toAbout
					</Text>
				</Animated.View>


				<UserOverlay user={user.secret} toLogin={() => router.toLogin() }
							 toUser={() => router.toUser({
							 	userName: user.publicInfo.loginname
							 })}/>


				<MessageOverlay user={user.secret}
								count={ message.unreadMessageCount }
								toMessage={ () => router.toMessage() }
				/>
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
		home: state.home,
		user: state.user,
		message: state.message
	}
}
