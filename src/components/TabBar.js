import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated} from 'react-native'

const { width } = Dimensions.get('window')
const underLineColor = '#3498DB'
const activeTabTextColor = 'rgba(0,0,0,9)'
const normalTabTextColor = 'rgba(0,0,0,0.4)'

class TabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    tabStyle: PropTypes.object,
    tabTextStyle: PropTypes.object,
    activeTabTextColor: PropTypes.string,
    normalTabTextColor: PropTypes.string
  };

  static defaultProps = {
    activeTabTextColor,
    normalTabTextColor
  };

  constructor (props) {
    super(props)
  }

  renderTabOption (name, page) {
    const isTabActive = this.props.activeTab === page
    const textStyle = {
      color: isTabActive ? this.props.activeTabTextColor : this.props.normalTabTextColor,
      fontWeight: isTabActive ? 'bold' : 'normal'
    }

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[ textStyle, this.props.tabTextStyle ]}>
            { name }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    var numberOfTabs = this.props.tabs.length
    var tabUnderlineStyle = {
      position: 'absolute',
      width: width / numberOfTabs,
      height: 4,
      backgroundColor: underLineColor,
      bottom: 0
    }

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, width / numberOfTabs]
    })

    return (
      <View style={[ styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, this.props.tabUnderlineStyle, {left}]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})

export default TabBar
