import React,{
	Component,
	StyleSheet,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import OverlayButton from './base/OverlayButton';
import { parseImgUrl } from '../utils';


class UserOverlay extends Component {
	_renderOverlayContent() {
		if (this.props.user) {
			const uri = parseImgUrl(this.props.user.avatar_url);
			return (
				<Image
					style={styles.userImg}
					source={{
						uri
					}}>
				</Image>
			)
		}

		return (
			<Icon
				name='person'
				size={28}
				color='rgba(255,255,255,0.9)'/>
		)
	}


	render() {
		return (
			<OverlayButton
				onPress={this.props.onPress}>
				{this._renderOverlayContent()}
			</OverlayButton>
		)
	}
}


const styles = StyleSheet.create({
	userImg: {
		borderWidth: 2,
		borderColor: '#2C3E50'
	}
});

export default UserOverlay;
