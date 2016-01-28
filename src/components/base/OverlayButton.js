import React,{
	View,
	Component,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const overlayButtonSize = 45;


class OverlayButton extends Component {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}>
				<View style={[styles.container, this.props.position ? this.props.position : styles.defaultPosition, this.props.style]}>
					{this.props.children}
				</View>
			</TouchableOpacity>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		height: overlayButtonSize,
		width: overlayButtonSize,
		position: 'absolute',
		borderRadius: overlayButtonSize / 2,
		backgroundColor: 'rgba(0,0,0,0.7)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	defaultPosition: {
		left: 20,
		bottom: 20
	}
});


export default OverlayButton;
