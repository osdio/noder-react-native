import React,{
	Component,
	View
} from 'react-native';


class Utils extends Component {
	componentDidMount() {
		const { actions } = this.props;
		actions.getUserFromStorage();
	}


	render() {
		return null;
	}
}


export const LayoutComponent = Utils;
export function mapStateToProps(state) {
	return {
		util: state.util
	}
}
