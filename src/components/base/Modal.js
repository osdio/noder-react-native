import React,{
	Component,
	PropTypes,
	Dimensions,
	View,
	StyleSheet,
	Animated,
	Easing,
} from 'react-native';
import { BlurView } from 'react-native-blur';


const { height, width } = Dimensions.get('window');


class Modal extends Component {
	static propTypes = {
		blur: PropTypes.bool,
		blurType: PropTypes.string
	};


	static defaultProps = {
		blur: false,
		blurType: 'dark'
	};


	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0.2)
		};
	}


	componentDidMount() {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			easing: Easing.quad,
			duration: 100
		}).start();
	}


	_renderChildren() {
		if (this.props.blur) {
			return (
				<BlurView blurType="dark" style={[ styles.blur, this.props.blurStyle]}>
					{ this.props.children }
				</BlurView>
			)
		}
		return this.props.children;
	}


	render() {
		return (
			<Animated.View style={[styles.container, this.props.style, {opacity: this.state.fadeAnim}]}>
				{ this._renderChildren() }
			</Animated.View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		top: 0,
		left: 0,
		height,
		width
	},
	blur: {
		height,
		width
	}
});


export default Modal;