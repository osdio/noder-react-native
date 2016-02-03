import React, {
	View,
	StyleSheet,
	Component,
	Text,
	Image,
	TouchableHighlight,
	Dimensions,
	PropTypes
} from 'react-native';
import { parseImgUrl, strlen, substring } from '../utils';


const { width } = Dimensions.get('window');


class TopicRow extends Component {
	static propTypes = {
		topic: PropTypes.object,
		footer: PropTypes.node
	};


	subStr(title) {
		const titleLength = Math.floor((width - 100) / 15) * 2;
		if (strlen(title) > titleLength) {
			return substring(title, 0, titleLength - 3) + '...';
		}
		return title
	}


	render() {
		const { topic } = this.props;


		return (
			<TouchableHighlight
				onPress={()=>{this.props.onPress(topic)}}
				underlayColor='#3498DB'
				key={topic.id}>

				<View style={ styles.row }>
					<View style={styles.imgWrapper}>
						<Image
							ref={view => this.imgView=view}
							style={styles.img}
							source={{uri: parseImgUrl(topic.author.avatar_url) }}>
						</Image>
					</View>

					<View style={[styles.topic]}>
						<Text
							ref={view => this.titleText=view}
							style={[styles.title]}>
							{ this.subStr(topic.title) }
						</Text>

						<View style={[styles.topicFooter]}>
							{ this.props.footer }
						</View>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}


var styles = StyleSheet.create({
	"row": {
		"height": 90,
		"flexDirection": "row",
		"borderBottomColor": "rgba(0, 0, 0, 0.02)",
		"borderBottomWidth": 1,
		"paddingTop": 25,
		"paddingRight": 0,
		"paddingBottom": 25,
		"paddingLeft": 20
	},
	"imgWrapper": {
		"width": 90,
		"position": "absolute",
		"left": 20,
		"top": 25,
		"height": 65
	},
	"img": {
		"height": 40,
		"width": 40,
		"borderRadius": 20
	},
	"topic": {
		"marginLeft": 60,
		width: width - 100
	},
	"title": {
		"fontSize": 15
	},
	"topicFooter": {
		"marginTop": 12,
		"flexDirection": "row"
	}
});


export default TopicRow;
