var React = require('react-native')
var rebound = require('rebound')
var precomputeStyle = require('precomputeStyle')


// custom component
var PageScrollView = require('./pageScrollView')


var styles = require('../styles/pageNavBar')

var window = require('../util/window')
var { width, height } = window.get()


var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    TouchableOpacity
    } = React;


var stylesExtends = StyleSheet.create({
    navBar: {
        width: width,
        height: 40
    }
});


class PageNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0
        }
        this._navBars = []
    }


    _onNavItemPress() {
        this.props.onItemPress()
    }


    _getActiveItemStyle(opacity) {
        return {
            borderTopColor: 'rgba(241,196,15,' + opacity + ')'
        };
    }


    _getNavs() {
        var pageIndex = this.props.pageIndex
        return this.props.navs.map((item, index, arr) => {
                var activeStyle = this._getActiveItemStyle(0)
                if (index == pageIndex) {
                    activeStyle = this._getActiveItemStyle(1)
                }

                return (
                    <View
                        ref={view => {this._navBars.push(view)}}
                        key={'navBar'+index}
                        style={[styles['navBar li'],activeStyle]}>
                        <TouchableOpacity onPress={()=>this.props.onItemPress(index)}>
                            <View style={styles['navBar item']}>
                                <Text style={styles['navBar text']}>
                                    {item}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
        )
    }


    // update the active nav style
    _updateNavsStyle(offset) {
        var space = this.props.space
        this.props.navs.forEach((item, index, arr)=> {
                var min = (index - 1) * space;
                var max = (index + 1) * space;
                var center = index * space;

                var opacity = 0;
                if (offset > min && offset < center) {
                    opacity = (offset - min) / space;
                }
                if (offset > center && offset < max) {
                    opacity = (max - offset) / space;
                }

                if (offset == center) {
                    opacity = 1;
                }

                var activeStyle = this._getActiveItemStyle(opacity)

                this._navBars[index].setNativeProps(precomputeStyle(activeStyle))
            }
        );
    }


    // exports to another component, I don't want to use props to let many component to rerender, it's too slow
    updateNav(offset) {
        this.refs.navPageScrollInner.setNativeProps({
            contentOffset: {
                x: offset,
                y: 0
            }
        })
        this._updateNavsStyle(offset)
    }


    render() {
        var totalPages = this.props.totalPages;
        var space = this.props.space;

        var widthStyle = {
            width: {
                width: (totalPages + 2) * 60 + (totalPages + 1) * (space - 60)
            }
        };

        return (
            <ScrollView
                ref='navPageScrollInner'
                bounces={false}
                horizontal={true}
                directionalLockEnabled={true}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[widthStyle.width]}
                contentOffset={{x:this.props.navBarOffset,y:0}}
                >
                <View style={[stylesExtends.navBar,widthStyle.width]}>
                    <View
                        style={[styles.navBar,stylesExtends.navBar,widthStyle.width]}>

                        <View
                            key='navItemFirst'
                            style={[styles['navBar li']]}>
                            <View style={styles['navBar item']}>
                                <Text style={styles['navBar text']}>

                                </Text>
                            </View>
                        </View>


                        {this._getNavs()}

                        <View
                            key='navItemLast'
                            style={styles['navBar li']}>
                            <View style={styles['navBar item']}>
                                <Text style={styles['navBar text']}>

                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


module.exports = PageNavBar;
