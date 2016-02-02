import React,{
	Component,
	PropTypes,
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	Animated,
	Easing
} from 'react-native';
import UserOverlay from '../components/UserOverlay';
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


	componentDidFocus() {
		console.log(2222);
	}


	render() {
		const { home, actions, router, user } = this.props;
		return (
			<View style={styles.container}>
				<Image
					style={[styles.bgImg]}
					source={{ uri: config.bgImgUri }}>

					<Text onPress={()=>{
						this.props.actions.toast('测试');
					}}>
						toAbout
					</Text>
				</Image>

				<UserOverlay user={user.secret} toLogin={() => router.toLogin() }
							 toUser={() => router.toUser({
							 	userName: user.publicInfo.loginname
							 })}/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		flex: 1
	},
	bgImg: {
		width,
		height,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	}
});


export const LayoutComponent = Home;
export function mapStateToProps(state) {
	return {
		home: state.home,
		user: state.user
	}
}
