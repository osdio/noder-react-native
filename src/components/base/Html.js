import React, {Component, PropTypes} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import _ from 'lodash';
import HtmlRender from 'react-native-html-render';
import {parseImgUrl, link} from '../../utils';


const {width, height} = Dimensions.get('window');
const defaultMaxImageWidth = width - 30 - 20;

const regs = {
	http: {
		topic: /^https?:\/\/cnodejs\.org\/topic\/\w*/,
		user: /^https?:\/\/cnodejs\.org\/user\/\w*/
	},
	gif: /.*\.gif$/
};


class Html extends Component {
	static propTypes = {
		router: PropTypes.object,
		imgStyle: PropTypes.object
	};


	static defaultProps = {
		maxImageWidth: defaultMaxImageWidth
	};

	constructor(props) {
		super(props);
		this._images = {};
	}


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
					id: topicId
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


	_onImageLoadEnd(uri, imageId) {
		const {maxImageWidth} = this.props;
		Image.getSize && Image.getSize(uri, (w, h)=> {
			if (w >= maxImageWidth) {
				h = (maxImageWidth / w) * h;
				w = maxImageWidth;
			}
			this._images[imageId] && this._images[imageId].setNativeProps({
				style: {
					width: w,
					height: h
				}
			});
		});
	}


	_renderNode(node, index, parent, type) {
		const name = node.name;
		const imgStyle = this.props.imgStyle || styles.img;


		if (node.type == 'block' && type == 'block') {
			if (name == 'img') {
				const uri = parseImgUrl(node.attribs.src);
				if (regs.gif.test(uri)) return null;
				const imageId = _.uniqueId('image_');
				return (
					<Image
						key={imageId}
						ref={view=>this._images[imageId]=view}
						source={{uri:uri}}
						style={imgStyle}
						onLoadEnd={this._onImageLoadEnd.bind(this, uri, imageId)}
					/>
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
		width: defaultMaxImageWidth,
		height: defaultMaxImageWidth,
		resizeMode: Image.resizeMode.cover,
		borderRadius: 5,
		margin: 10
	}
});

export default Html;
