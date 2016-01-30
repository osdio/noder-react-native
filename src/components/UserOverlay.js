import React,{
	Component,
	StyleSheet,
	Image,
	PropTypes
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import OverlayButton from './base/OverlayButton';
import { parseImgUrl } from '../utils';


class UserOverlay extends Component {
	static propTypes = {
		toLogin: PropTypes.func,
		toUser: PropTypes.func
	};


	_onPress() {
		const { user, toLogin, toUser } = this.props;
		if (user) {
			toUser();
		}
		else {
			toLogin();
		}
	}


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
				onPress={this._onPress.bind(this)}>
				{this._renderOverlayContent()}
			</OverlayButton>
		)
	}
}


const styles = StyleSheet.create({
	userImg: {
		borderWidth: 2,
		borderColor: '#2C3E50',
		width: 45,
		height: 45,
		borderRadius: 45 / 2
	}
});

export default UserOverlay;
