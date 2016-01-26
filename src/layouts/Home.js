import React,{
	Component,
	PropTypes,
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';
import UserOverlay from '../components/UserOverlay';


const { height, width } = Dimensions.get('window');


class Home extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Home
				</Text>
				<Text onPress={()=>{
					this.props.actions.test();
				}}>
					{ this.props.test.test ? 'true' : 'false' }
				</Text>
				<Text onPress={()=>{
					this.props.router.toAbout();
				}}>
					to About
				</Text>
				<UserOverlay>

				</UserOverlay>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		height,
		width
	}
});


export const LayoutComponent = Home;
export function mapStateTopProps(state) {
	return {
		test: state.test
	}
};
