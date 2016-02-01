import React,{
	ActivityIndicatorIOS,
	ProgressBarAndroid,
	Component,
	PropTypes,
	Platform
} from 'react-native';


class Spinner extends Component {
	render() {
		if (Platform.OS === 'android') {
			return (
				<ProgressBarAndroid {...this.props}/>
			)
		}
		return (
			<ActivityIndicatorIOS
				animating={true}
				{...this.props}/>
		)
	}
}


export default Spinner;


