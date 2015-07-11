var React = require('react-native');
var moment = require('moment');

var topicService = require('../services/topicService')
var TopicRow = require('../components/topicRow')

var routes = require('../configs/config')
var config = require('../configs/config')
var sceneConfig = require('../configs/sceneConfig')
var styles = require('../styles/pageListView')
var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    StatusBarIOS,
    Image,
    ListView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    Navigator
    } = React;


var extendsStyles = StyleSheet.create({
    topic: {
        width: width - 100
    },
    loadingtop: {
        width: width,
        marginTop: 20
    },
    loadingbottom: {
        bottom: 0,
        position: 'absolute',
        width: width,
        marginTop: 20
    }
});

class PageListView extends Component {
    constructor(porps) {
        super(porps);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var data = [];
        this.state = {
            ds: ds.cloneWithRows(data),
            data: data,
            page: 0,
            isLoading: false,
            loadingPosition: 'top'
        };
    }


    shouldComponentUpdate(nextProps, nextState) {
        if ((nextState.data != this.state.data) || (nextState.isLoading != this.state.isLoading)) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this._fetchTopic('update')
        this._getTopicFromStorage()
    }

    onEndReached() {
        this._fetchTopic('get');
    }

    onScroll(e) {
        if (e.nativeEvent.contentOffset.y < -90) {
            this._fetchTopic('update');
        }
    }


    _fetchTopic(type) {
        if (this.state.isLoading) return

        var loadingPositionMap = {
            update: 'top',
            get: 'bottom'
        }


        // set the loading state, prevent too much fetching at one time
        this.setState({
            isLoading: true,
            loadingPosition: loadingPositionMap[type]
        })


        var page = this.state.page + 1
        var tabs = this.props.tabs
        var index = this.props.pageIndex

        if (type == 'update') {
            page = 1
        }


        topicService.req.getTopicsByTab({
            page: page,
            tab: tabs[index],
            limit: 10
        })
            .then(topics=> {
                var newData = [];
                if (type == 'get') {
                    newData = this.state.data.concat(topics);
                }
                else {
                    newData = topics;
                }
                this.setState({
                    ds: this.state.ds.cloneWithRows(newData),
                    data: newData,
                    page: page,
                    isLoading: false
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                })
                console.warn(error)
            })
            .done()
    }


    _getTopicFromStorage() {
        let tabs = this.props.tabs
        let index = this.props.pageIndex
        topicService.storage.get(tabs[index])
            .then((data)=> {
                this.setState({
                    data: data,
                    page: 1,
                    ds: this.state.ds.cloneWithRows(data)
                })
            })
            .catch(function (err) {
                console.warn(err)
            })
            .done()
    }


    _renderLoading(position) {
        if (this.state.isLoading && position == this.state.loadingPosition) {
            return (
                <ActivityIndicatorIOS
                    hidesWhenStopped={false}
                    size="large"
                    animating={this.state.isLoading}
                    style={[extendsStyles['loading'+position]]}/>
            )
        }
        return null;
    }


    _renderTopicFooter(topic) {
        var renderArr = [];
        var navs = {
            ask: '问答',
            share: '分享',
            job: '招聘'
        }
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


    _onRowPress(topic) {
        routes.toTopic(this, {
            topic: topic
        })
    }


    renderRow(topic) {
        return (
            <TopicRow
                onPress={this._onRowPress.bind(this)}
                topic={topic}
                footer={this._renderTopicFooter(topic)}
                ></TopicRow>
        )
    }

    render() {
        return (
            <View style={[{width:width,height:height - 40},{backgroundColor:'white'}]}>

                {this._renderLoading('top')}

                <ListView
                    style={{backgroundColor:'rgba(255,255,255,1)'}}
                    onScroll={this.onScroll.bind(this)}
                    showsVerticalScrollIndicator={true}
                    initialListSize={10}
                    pagingEnabled={false}
                    removeClippedSubviews={true}
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    />
                {this._renderLoading('bottom')}
            </View>
        )
    }
}

module.exports = PageListView;
