import React, {
	Component,
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	ActivityIndicatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './base/Spinner';
import * as topicService from '../services/topicService';


class CommentUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUped: this._isUped(this.props.user.id, this.props.ups),
			isLoading: false,
			count: this.props.ups.length
		}
	}


	_onUpPress() {
		if (this.props.user.loginname == this.props.authorName) {
			return window.alert('不能给自己点赞哦!')
		}
		if (this.state.isLoading) return;

		this.setState({
			isLoading: true
		});

		topicService.req.upComment(this.props.replyId)
			.then(isUped=> {
				let count = this.state.count;
				isUped ? count++ : count--;
				this.setState({
					isUped: isUped,
					isLoading: false,
					count: count < 0 ? 0 : count
				})
			})
			.catch(err=> {
				console.warn(err);
				this.setState({
					isLoading: false
				})
			})
			.done()
	}


	_isUped(id, ups) {
		return ups.some(item=> {
			return item == id
		})
	}


	_renderUpIcon() {
		if (this.state.isLoading) {
			return (
				<Spinner
					size='small'
					style={styles.loading}
				/>
			)
		}
		return (
			<Icon
				name={'thumbsup'}
				size={16}
				color={this.state.isUped ? '#3498DB':'rgba(0,0,0,0.2)'}
				style={styles.upIcon}
			/>
		)
	}


	render() {
		let count = this.state.count || 0;
		return (
			<TouchableOpacity
				onPress={this._onUpPress.bind(this)}>
				<View style={this.props.style}>

					{this._renderUpIcon()}

					{count == 0 ? null : (<Text style={styles.text}>{count}</Text>)}
				</View>
			</TouchableOpacity>
		)
	}
}


const styles = StyleSheet.create({
	text: {
		paddingLeft: 7,
		fontSize: 12,
		color: 'rgba(0,0,0,0.2)',
		height: 12
	},
	loading: {
		height: 12,
		width: 16
	}
});


export default CommentUp;
