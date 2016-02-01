import React,{
	StyleSheet,
	View,
	Text,
	Component,
	VibrationIOS,
	Dimensions
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';


const { height, width } = Dimensions.get('window');
const cameraSize = 250;
const borderColor = 'rgba(255,255,255,0.6)';
const borderBoxSize = 35;


class QRCode extends Component {
	constructor(props) {
		super(props);
		this.succesed = false
	}

	_onBarCodeRead(result) {
		const { router, actions } = this.props;
		if (this.succesed) return;

		this.succesed = true;
		VibrationIOS.vibrate();
		actions.checkToken(result.data, ()=> {
			router.pop();
			actions.toast('登陆成功');
		});
		router.pop();
	}


	_onClosePress() {
		this.props.router.pop()
	}


	render() {
		return (
			<View>
				<Camera
					ref='camera'
					style={styles.camera}
					onBarCodeRead={this._onBarCodeRead.bind(this)}>

					<View style={styles.header}>
						<View style={styles.buttonWrapper}>
							<Button
								onPress={this._onClosePress.bind(this)}
								style={styles.closeButton}>
								<Icon
									name='ios-close-empty'
									size={40}
									color='rgba(255,255,255,0.7)'/>
							</Button>
						</View>
					</View>


					<View style={styles.container}>
						<View style={styles.cameraViewWrapper}>
							<View style={styles.cameraView}>
								<View key="1" style={[styles.borderLeftTop,styles.borderBox]}/>
								<View key="2" style={[styles.borderRightTop,styles.borderBox]}/>
								<View key="3" style={[styles.borderLeftBottom,styles.borderBox]}/>
								<View key="4" style={[styles.borderRightBottom,styles.borderBox]}/>
							</View>
							<Text style={styles.infoText}>
								请将二维码放到框内
							</Text>
						</View>
					</View>
				</Camera>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	camera: {
		width: width,
		height: height,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		height: 80,
		width: 350,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	cameraView: {
		height: cameraSize,
		width: cameraSize,
	},
	container: {
		height: 350
	},
	borderBox: {
		position: 'absolute',
		borderWidth: 2,
		height: borderBoxSize,
		width: borderBoxSize
	},
	borderLeftTop: {
		borderColor: 'transparent',
		borderLeftColor: borderColor,
		borderTopColor: borderColor,
		left: 0,
		top: 0
	},
	borderRightTop: {
		borderColor: 'transparent',
		borderRightColor: borderColor,
		borderTopColor: borderColor,
		right: 0,
		top: 0
	},
	borderLeftBottom: {
		borderColor: 'transparent',
		borderLeftColor: borderColor,
		borderBottomColor: borderColor,
		left: 0,
		bottom: 0
	},
	borderRightBottom: {
		borderColor: 'transparent',
		borderRightColor: borderColor,
		borderBottomColor: borderColor,
		right: 0,
		bottom: 0
	},
	infoText: {
		color: 'rgba(255,255,255,0.7)',
		textAlign: 'center',
		marginTop: 40,
		fontSize: 24
	},
	closeButton: {
		width: 35,
		height: 35,
		backgroundColor: 'red',
		borderRadius: 35 / 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	buttonWrapper: {
		width: 35,
		height: 35,
		position: 'absolute',
		right: 30,
		top: 0
	}
});


export const LayoutComponent = QRCode;
export function mapStateToProps(state) {
	return {
		home: state.home
	}
}
