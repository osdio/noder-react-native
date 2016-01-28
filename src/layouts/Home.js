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
		const { home, actions, router } = this.props;
		return (
			<View style={styles.container}>
				<Image
					style={styles.bgImg}
					source={{ uri: config.bgImgUri }}>

					<Text onPress={()=>{
						this.props.router.toAbout();
					}}>
						toAbout
					</Text>
				</Image>


				<UserOverlay onPress={() => router.toLogin() }/>
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
		height,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});


export const LayoutComponent = Home;
export function mapStateTopProps(state) {
	return {
		home: state.home
	}
}
