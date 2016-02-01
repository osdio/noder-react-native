import React,{
	Component,
	View,
	StyleSheet,
	Text
} from 'react-native';
import Toast from '../components/base/Toast';


class Utils extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		const { actions } = this.props;
		//actions.getUserFromStorage();
	}


	componentWillReceiveProps(nextProps) {
		if (this.props.toast.id !== nextProps.toast.id) {
			this.toast.show(nextProps.toast.text, nextProps.toast.timeout);
		}
	}


	render() {
		return (
			<Toast ref={ (view)=> this.toast=view } style={styles.container}/>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		position: 'absolute'
	}
});


export const LayoutComponent = Utils;
export function mapStateToProps(state) {
	const { utils = {} } = state;
	return {
		...utils
	}
}
