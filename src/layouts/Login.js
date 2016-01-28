import React,{
	View,
	Component,
	Text,
	TouchableHighlight,
	ActivityIndicatorIOS,
	StyleSheet,
	Dimensions,
	Image,
	PropTypes
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
import { BlurView } from 'react-native-blur';

const { height, width } = Dimensions.get('window');


class Login extends Component {
	_onLoginPress() {
		if (this.props.ui.checkTokenLoading) return;
		this.props.router.toQRCode();
	}


	_renderLoginButton() {
		if (this.props.ui.checkTokenLoading) {
			return (
				<ActivityIndicatorIOS
					hidesWhenStopped={true}
					size="small"
					animating={true}
					color='white'
					style={styles.loading}/>
			)
		}
		return (
			<Icon.Button
				onPress={this._onLoginPress.bind(this)}
				backgroundColor="#3498DB"
				name='camera'
				size={28}
				style={styles.iconButton}>
				<Text style={styles.iconButtonText}>扫码登陆</Text>
			</Icon.Button>
		)
	}


	render() {
		const { router } = this.props;

		return (
			<View style={styles.wrapper}>
				<TouchableHighlight onPress={()=> router.pop()} style={styles.closeIcon}>
					<Icon size={25} color="rgba(255,255,255,0.5)" name="close"/>
				</TouchableHighlight>


				<View style={styles.content}>
					<View style={styles.info}>
						<Image source={require('../images/noderIcon.png')}/>
						<Text style={styles.infoText}>
							国内最专业的 Node.js 开源技术社区
						</Text>
					</View>
				</View>
				{this._renderLoginButton()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width,
		height,
		backgroundColor: '#292829'
	},
	content: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 400
	},
	info: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	infoText: {
		color: 'rgba(255,255,255,0.5)'
	},
	iconButton: {
		paddingRight: 30,
		paddingLeft: 30
	},
	iconButtonText: {
		color: 'rgba(255,255,255,0.9)'
	},
	closeIcon: {
		position: 'absolute',
		top: 40,
		right: 40
	}
});


export const LayoutComponent = Login;
export function mapStateToProps(state) {
	return {
		ui: state.loginUI
	};
}
