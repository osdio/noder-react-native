var React = require('react-native')
var moment = require('moment')

var TopicService = require('../services/topicService')
var TopicRow = require('../components/topicRow')

var routes = require('../configs/routes')
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
    LayoutAnimation,
    TouchableOpacity
    } = React


var extendsStyles = StyleSheet.create({
    topic: {
        width: width - 100
    },
    loadingupdate: {
        width: width,
        marginTop: 20
    },
    loadingget: {
        width: width,
        marginBottom: 20,
        marginTop: 20
    }
});

class PageListView extends Component {
    constructor(porps) {
        super(porps)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.page = 1
        this.state = {
            ds: this.ds.cloneWithRows(this.props.data),
            isLoading: false,
            loadingPosition: 'top',
            getTopicError: null
        }
    }


    componentDidMount() {
        this._fetchTopic('update')
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data != this.props.data || nextState.isLoading != this.state.isLoading) {
            return true
        }
        return false
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            console.log(this.props.data.length);
            //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({
                ds: this.ds.cloneWithRows(nextProps.data)
            })
        }
    }


    onEndReached() {
        this._fetchTopic('get')
    }

    onScroll(e) {
        if (e.nativeEvent.contentOffset.y < -90) {
            this._fetchTopic('update')
        }
    }

    scrollToTop() {
        this._listView.setNativeProps({
            contentOffset: {
                x: 0,
                y: 0
            }
        })
    }


    _onRowPress(topic) {
        routes.toTopic(this, {
            topicId: topic.id,
            topic: topic
        })
    }


    _onGetAgainPress() {
        this._fetchTopic('get')
    }


    _fetchTopic(type) {
        if (this.isFreshing) {
            if (type == 'get') {
                this.setState({
                    getTopicError: 'fetchFailed'
                })
            }
            return
        }

        this.isFreshing = true
        this.setState({
            isLoading: true,
            loadingType: type
        })

        var page = (type == 'update') ? 1 : this.page + 1
        var tab = this.props.tab.name
        var actions = this.props.actions
        var getTopics = actions.getTopicsByTab
        var updateTopics = actions.updateTopicsByTab

        TopicService.req.getTopicsByTab({
            page: page,
            tab: tab,
            limit: 10
        })
            .then(topics=> {
                console.log('fetched topics');
                type == 'update' ? updateTopics(topics, tab) : getTopics(topics, tab)
                return null
            })
            .catch(err=> {
                console.warn(err)
                if (type == 'get') {
                    return err
                }
            })
            .done((err)=> {
                this.isFreshing = false
                this.setState({
                    isLoading: false,
                    err: err
                })
                this.page = page
            })
    }


    _renderLoading(loadingType) {
        return (
            <ActivityIndicatorIOS
                hidesWhenStopped={false}
                size="large"
                animating={true}
                style={[extendsStyles['loading'+loadingType]]}
                />
        )
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


    _renderHeader() {
        if (this.state.isLoading && this.state.loadingType == 'update') {
            return this._renderLoading('update')
        }

        return null
    }


    _renderFooter() {
        if (this.state.isLoading && this.state.loadingType == 'get') {
            return this._renderLoading('get')
        }

        //return (
        //    <View style={{height:76,width:width}}>
        //
        //    </View>
        //)
        return null
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
                <ListView
                    ref={view => {this._listView = view}}
                    style={{backgroundColor:'rgba(255,255,255,1)'}}
                    onScroll={this.onScroll.bind(this)}
                    showsVerticalScrollIndicator={true}
                    initialListSize={10}
                    pagingEnabled={false}
                    removeClippedSubviews={true}
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    scrollRenderAheadDistance={90}
                    renderHeader={this._renderHeader.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    />
            </View>
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
})

module.exports = PageListView;
