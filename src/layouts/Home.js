import React,{
	Component,
	PropTypes,
	View,
	Text
} from 'react-native';


class Home extends Component {
	render() {
		return (
			<View>
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
			</View>
		);
	}
}


export const LayoutComponent = Home;
export function mapStateTopProps(state) {
	return {
		test: state.test
	}
};
