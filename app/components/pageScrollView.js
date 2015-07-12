var React = require('react-native')
var window = require('../util/window')
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
})


class PageScrollView extends Component {
    constructor(props) {
        super(props)
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


    scrollTo(x,type) {
        if(type>1){
            this.scrollView.setNativeProps({
                    contentOffset: {
                        x: x,
                        y: 0
                    }
                }
            )
        }
        else{
            this.scrollView.scrollTo(0, x)
        }
    }


    render() {
        var self = this
        return (
            <ScrollView
                ref={view=>this.scrollView=view}
                contentOffset={this._getInitContentOffset()}
                bounces={true}
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


module.exports = PageScrollView
