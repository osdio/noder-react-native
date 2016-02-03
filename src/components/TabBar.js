'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    } = React;

var deviceWidth = require('Dimensions').get('window').width;


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
        justifyContent: 'space-around'
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

    render() {
        var numberOfTabs = this.props.tabs.length;
        var tabUnderlineStyle = {
            position: 'absolute',
            width: deviceWidth / numberOfTabs,
            height: 4,
            backgroundColor: underLineColor,
            bottom: 0,
        };

        var left = this.props.scrollValue.interpolate({
            inputRange: [0, 1], outputRange: [0, deviceWidth / numberOfTabs]
        });

        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                <Animated.View style={[tabUnderlineStyle, {left}]}/>
            </View>
        );
    },
});

module.exports = DefaultTabBar;

