'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    } = React;

var deviceWidth = require('Dimensions').get('window').width;
var precomputeStyle = require('precomputeStyle');
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';
var underLineColor = '#3498DB'
var activeTabTextColor = 'rgba(0,0,0,9)'
var normalTabTextColor = 'rgba(0,0,0,0.4)'

var styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },

    tabs: {
        height: 50 + 4,
        flexDirection: 'row',
        marginTop: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.06)',
        //shadowColor: 'rgba(0,0,0,1)',
        //shadowOffset: {
        //    width: -1,
        //    height: -2
        //},
        //shadowOpacity: 0.1,
        //alignItems: 'center'
    },
});

var DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array
    },

    renderTabOption(name, page) {
        var isTabActive = this.props.activeTab === page;

        return (
            <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
                <View style={[styles.tab]}>
                    <Text
                        style={{color: isTabActive ? activeTabTextColor : normalTabTextColor, fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    },

    setAnimationValue(value) {
        this.refs[TAB_UNDERLINE_REF].setNativeProps(precomputeStyle({
            left: (deviceWidth * value) / this.props.tabs.length
        }));
    },

    render() {
        var numberOfTabs = this.props.tabs.length;
        var tabUnderlineStyle = {
            position: 'absolute',
            width: deviceWidth / numberOfTabs,
            height: 4,
            backgroundColor: underLineColor,
            bottom: 0,
        };

        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                <View style={tabUnderlineStyle} ref={TAB_UNDERLINE_REF}/>
            </View>
        );
    },
});

module.exports = DefaultTabBar;
