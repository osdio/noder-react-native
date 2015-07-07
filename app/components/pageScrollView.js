var React = require('react-native');
var window = require('../util/window');
var { width, height } = window.get()


var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    StatusBarIOS
    } = React;


var stylesExtends = StyleSheet.create({
    page: {
        width: width
    }
});


class PageScrollView extends Component {
    constructor(props) {
        super(props);
        this.total = props.children ? props.children.length : 3;
        this.state = {
            index: 0
        }
    }

    _getInitContentOffset() {
        return {
            x: this.props.pageIndex * width,
            y: 0
        };
    }

    render() {
        var self = this;
        return (
            <ScrollView
                ref={view=>this.scrollView=view}
                contentOffset={this._getInitContentOffset()}
                bounces={true}
                //alwaysBounceVertical={true}
                //alwaysBounceHorizontal={false}
                horizontal={true}
                directionalLockEnabled={true}
                scrollEventThrottle={16}
                onScroll={this.props.onScroll}
                pagingEnabled={true}
                onScrollBeginDrag={this.props.onScrollBeginDrag}
                onScrollEndDrag={this.props.onScrollEndDrag}
                scrollEnabled={true}
                automaticallyAdjustContentInsets={false}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>

                {this.props.children.map(function (pageContent, index) {
                    return (
                        <View
                            key={'pageScrollView'+index}
                            style={[stylesExtends.page, self.props.pageStyle]}>
                            {pageContent}
                        </View>
                    )
                })}

            </ScrollView>
        )
    }

}


module.exports = PageScrollView;