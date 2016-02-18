import React, {
	Component,
	StyleSheet,
	Image,
	Dimensions,
	PropTypes
} from 'react-native';
import HtmlRender from 'react-native-html-render';
import { parseImgUrl, link } from '../../utils';


const { width, height } = Dimensions.get('window');


const regs = {
	http: {
		topic: /^https?:\/\/cnodejs\.org\/topic\/\w*/,
		user: /^https?:\/\/cnodejs\.org\/user\/\w*/
	}
};


class Html extends Component {
	static propTypes = {
		router: PropTypes.object,
		imgStyle: PropTypes.object
	};


	_onLinkPress(url) {
		let router = this.props.router;

		if (/^\/user\/\w*/.test(url)) {
			let authorName = url.replace(/^\/user\//, '');

			router.toUser({
				userName: authorName
			})
		}

		if (/^https?:\/\/.*/.test(url)) {
			if (regs.http.topic.test(url)) {
				let topicId = url.replace(/^https?:\/\/cnodejs\.org\/topic\//, '');

				return router.toTopic({
					topicId: topicId,
					from: 'html'
				})
			}

			if (regs.http.user.test(url)) {
				let userName = url.replace(/^https?:\/\/cnodejs\.org\/user\//, '');

				return router.toUser({
					userName: userName
				})
			}

			link(url)
		}

		if (/^mailto:\w*/.test(url)) {
			link(url)
		}
	}


	_renderNode(node, index, parent, type) {
		const name = node.name;
		const imgStyle = this.props.imgStyle || styles.img;


		if (node.type == 'block' && type == 'block') {
			if (name == 'img') {
				const uri = parseImgUrl(node.attribs.src);
				if (/.*\.gif$/.test(uri)) return null;
				return (
					<Image
						key={index}
						source={{uri:uri}}
						style={imgStyle}>
					</Image>
				)
			}
		}
	}


	render() {
		return (
			<HtmlRender
				value={this.props.content}
				stylesheet={this.props.style}
				onLinkPress={this._onLinkPress.bind(this)}
				renderNode={this._renderNode.bind(this)}
			/>
		)
	}
}


const styles = StyleSheet.create({
	img: {
		width: width - 30,
		height: width - 30,
		resizeMode: Image.resizeMode.contain
	}
});

export default Html;
