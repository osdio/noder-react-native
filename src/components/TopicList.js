import React, {
	View,
	StyleSheet,
	Component,
	Text,
	ListView,
	Dimensions,
	PropTypes
} from 'react-native';
import TopicRow from './TopicRow';
import moment from 'moment';


const { height, width } = Dimensions.get('window');


class TopicList extends Component {
	static propTypes = {
		data: PropTypes.array,
		router: PropTypes.object
	};


	static defaultProps = {
		data: []
	};


	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds: ds.cloneWithRows(props.data)
		}
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState({
				ds: this.state.ds.cloneWithRows(nextProps.data)
			})
		}
	}

	_onScroll(e) {

	}


	_renderTopicFooter(topic) {
		var renderArr = [];
		var navs = {
			ask: '问答',
			share: '分享',
			job: '招聘'
		};
		var tab = navs[topic.tab] || '分享';
		var date = moment(topic.last_reply_at).startOf('minute').fromNow();


		renderArr.push(
			<Text
				key='countText'
				style={[styles['topicFooter text'],styles['topicFooter count']]}>
				{topic.reply_count + ' / ' + topic.visit_count}
			</Text>
		);
		renderArr.push(
			<Text
				key='tabText'
				style={[styles['topicFooter text'],styles['topicFooter tab']]}>
				{tab}
			</Text>
		);

		renderArr.push(
			<Text
				key='dateText'
				style={[styles['topicFooter text'],styles['topicFooter date']]}>
				{date}
			</Text>
		);

		if (topic.top) {
			renderArr.push(
				<Text
					key='topText'
					style={[styles['topicFooter text'],styles['topicFooter tab'],styles['topicFooter top']]}>
					{'顶'}
				</Text>
			);
		}
		if (topic.good) {
			renderArr.push(
				<Text
					key='goodText'
					style={[styles['topicFooter text'],styles['topicFooter tab'],styles['topicFooter good']]}>
					{'精'}
				</Text>
			);
		}
		return renderArr;

	}


	renderRow(topic) {
		return (
			<TopicRow
				key={topic.id}
				topic={topic}
				onPress={(topic)=>{
					this.props.router.toTopic({
						id: topic.id,
						topic
					});
				}}
				footer={this._renderTopicFooter(topic)}/>
		)
	}


	render() {
		return (
			<View style={styles.container}>
				<ListView
					showsVerticalScrollIndicator
					removeClippedSubviews
					ref={view => {this._listView = view}}
					initialListSize={10}
					pagingEnabled={false}
					scrollRenderAheadDistance={90}
					dataSource={this.state.ds}
					renderRow={this.renderRow.bind(this)}
					onScroll={this._onScroll.bind(this)}
				/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		width,
		height: height - 40
	},
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
		"marginLeft": 60
	},
	"title": {
		"fontSize": 15
	},
	"topicFooter": {
		"marginTop": 12,
		"flexDirection": "row"
	},
	"topicFooter text": {
		"fontSize": 11,
		"color": "rgba(0, 0, 0, 0.5)"
	},
	"topicFooter date": {
		"position": "absolute",
		"right": 0,
		"top": 0
	},
	"topicFooter count": {
		"marginRight": 15
	},
	"topicFooter top": {
		"fontSize": 11,
		"marginTop": 1,
		"marginRight": 0,
		"marginBottom": 0,
		"marginLeft": 10,
		"color": "#E74C3C"
	},
	"topicFooter good": {
		"fontSize": 11,
		"marginTop": 1,
		"marginRight": 0,
		"marginBottom": 0,
		"marginLeft": 10,
		"color": "#2ECC71"
	},
	"topicFooter tab": {
		"fontSize": 11,
		"marginTop": 1,
		"marginRight": 0,
		"marginBottom": 0,
		"marginLeft": 10
	},
	"loading": {
		"marginTop": 250
	},
	footerErrorText: {
		fontSize: 20,
		textAlign: 'center',
		flex: 1
	},
	footerError: {
		height: 76,
		width: width,
		flexDirection: 'column'
	}
});

export default TopicList;
