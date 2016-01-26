import React,{
	View,
	Component,
	StyleSheet
} from 'react-native';
import Button from 'react-native-button';

var overlayButtonSize = 45;

var styles = StyleSheet.create({
	container: {
		height: overlayButtonSize,
		width: overlayButtonSize,
		position: 'absolute',
		borderRadius: overlayButtonSize / 2,
		backgroundColor: 'rgba(0,0,0,0.7)'
	},
	returnIcon: {
		height: overlayButtonSize,
		width: overlayButtonSize,
		borderRadius: overlayButtonSize / 2
	},
	defaultPosition: {
		left: 20,
		bottom: 20
	}
});


class OverlayButton extends Component {
	render() {
		return (
			<View
				style={[styles.container, this.props.position ? this.props.position : styles.defaultPosition, this.props.style]}>
				<Button
					style={this.props.buttonStyle}
					onPress={this.props.onPress}>
					{this.props.children}
				</Button>
			</View>
		)
	}
}


export default OverlayButton;
