var React = require('react-native')
var rebound = require('rebound')

// custom component
var PageScrollView = require('./pageScrollView')
var PageNavBar = require('./pageNavBar')
var PageListView = require('./pageListView')


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
    TouchableHighlight,
    Navigator,
    AsyncStorage
    } = React


class TopicsInTab extends Component {
    constructor(props) {
        super(props);
        this.navs = ['精华', '问答', '主页', '分享', '招聘'];
        this.totalPages = this.navs.length;
        this.tabs = ['good', 'ask', 'all', 'share', 'job'];
        this.space = (width - (60 * 3)) / 2 + 60;
        var pageIndex = 2;
        var pageScrollContentWidth = width * pageIndex;
        var pageNavBarWith = (this.space / width) * pageScrollContentWidth;
        var pageNavBarOffset = (pageIndex * width / pageScrollContentWidth) * pageNavBarWith;

        this.state = {
            pageIndex: pageIndex,
            navBarOffset: pageNavBarOffset
        }
    }

    componentWillMount() {
        this.springSystem = new rebound.SpringSystem()
        this._scrollSpring = this.springSystem.createSpring()
        this._updateSpringConfig(this.props)

        this._scrollSpring.addListener({
            onSpringUpdate: () => {
                var currentValue = this._scrollSpring.getCurrentValue()
                var space = this.space
                var offset = currentValue.offset
                var pageScrollContentWidth = currentValue.contentWidth
                if (offset < 0 || offset > pageScrollContentWidth - width) {
                    return
                }

                var pageNavBarWith = (space / width) * pageScrollContentWidth
                var pageNavBarOffset = (offset / pageScrollContentWidth) * pageNavBarWith

                this._pageNavBar.updateNav(pageNavBarOffset)
            }
        });
    }

    componentDidMount() {
        this._scrollSpring.setCurrentValue({
            offset: this.state.pageIndex * width,
            contentWidth: 0
        });
    }

    _updateSpringConfig(props) {
        var springConfig = this._scrollSpring.getSpringConfig();
        springConfig.tension = rebound.OrigamiValueConverter.tensionFromOrigamiValue(props.springTension || 25)
        springConfig.friction = rebound.OrigamiValueConverter.frictionFromOrigamiValue(props.springFriction || 8)

        this._scrollSpring.setOvershootClampingEnabled((typeof props.clampSpring === 'undefined') ? true : props.clampSpring)
    }


    ////don't render when the pageIndex is not change
    //shouldComponentUpdate(nextProps, nextState) {
    //    if (nextProps.topic !== this.props.topic) {
    //        return true
    //    }
    //    return false
    //}


    _pageScrollViewOnScroll(e) {
        var offset = e.nativeEvent.contentOffset.x
        this._scrollSpring.setCurrentValue({
            offset: offset,
            contentWidth: e.nativeEvent.contentSize.width
        })
    }


    _onNavItemPress(index) {
        var {offset} = this._scrollSpring.getCurrentValue()
        if (offset % width == 0) {
            var currentIndex = offset / width
            if (currentIndex == index) {
                this['_pageListView_' + index] && this['_pageListView_' + index].scrollToTop()
            }
            this._pageScrollView.scrollTo(index * width, Math.abs(currentIndex - index))
        }
    }


    _renderPageListView() {
        var navs = this.navs
        var tabs = this.tabs
        var space = this.space
        return navs.map((nav, index) => {
            var tab = tabs[index]
            return (
                <PageListView
                    ref={view => {this['_pageListView_'+index]=view}}
                    key={'listView'+index}
                    navs={navs}
                    space={space}
                    data={this.props.topic[tab].topics}
                    actions={this.props.actions}
                    tab={this.props.topic[tab]}
                    />
            )
        })
    }


    render() {
        return (
            <View>
                <PageNavBar
                    navBarOffset={this.state.navBarOffset}
                    pageIndex={this.state.pageIndex}
                    space={this.space}
                    navs={this.navs}
                    totalPages={this.totalPages}
                    onItemPress={this._onNavItemPress.bind(this)}
                    ref={view => {this._pageNavBar=view}}>
                </PageNavBar>


                <PageScrollView
                    ref={view => {this._pageScrollView=view}}
                    pageIndex={this.state.pageIndex}
                    totalPages={this.totalPages}
                    onScroll={this._pageScrollViewOnScroll.bind(this)}
                    onScrollBeginDrag={this._pageScrollViewOnScroll.bind(this)}
                    >
                    {this._renderPageListView()}
                </PageScrollView>
            </View>
        )
    }
}


module.exports = TopicsInTab
