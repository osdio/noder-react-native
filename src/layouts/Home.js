import React,{
	Component,
	PropTypes,
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native';
import UserOverlay from '../components/UserOverlay';
import config from '../configs';


const { height, width } = Dimensions.get('window');


class Home extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.bgImg}
					source={{ uri: config.bgImgUri }}>

				</Image>


				<UserOverlay/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		width: width,
		flex: 1,
		backgroundColor: "transparent"
	},
	bgImg: {
		width,
		height
	}
});


export const LayoutComponent = Home;
export function mapStateTopProps(state) {
	return {
		test: state.test
	}
};
