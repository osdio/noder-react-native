import React,{
	Component,
	PropTypes,
	View,
	Text
} from 'react-native';


class About$ extends Component {
	render() {
		return (
			<View>
				<Text>
					About
				</Text>
			</View>
		);
	}
}


export const LayoutComponent = About$;
export function mapStateTopProps(state) {
	return state;
};
