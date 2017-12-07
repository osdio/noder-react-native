import React, {Component} from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  Animated,
  ViewPagerAndroid
} from 'react-native'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const {height, width} = Dimensions.get('window')

class ScrollableTabs extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    tabNavItemWidth: PropTypes.number,
    index: PropTypes.number,
    onPageChanged: PropTypes.func,
    onPageChangedAndAnimateEnd: PropTypes.func
  };

  static defaultProps = {
    tabs: [],
    tabNavItemWidth: 60
  };

  constructor (props) {
    super(props)
    const {tabNavItemWidth, tabs} = props
    this.space = (width - tabNavItemWidth * 3) / 2
    this.navContentWidth = (tabs.length + 2) * tabNavItemWidth + this.space * (tabs.length + 1)
    this.index = props.index || Math.floor(tabs.length / 2)
    const offset = this.index * (this.space + tabNavItemWidth)
    this.state = {
      x: new Animated.Value(-offset)
    }
    this.state.x.addListener((e) => {
      if (e.value % (this.space + tabNavItemWidth) === 0) {
        let index = Math.abs(e.value / (this.space + tabNavItemWidth))
        this._scrolling = false
        typeof this.props.onPageChangedAndAnimateEnd === 'function' && this.props.onPageChangedAndAnimateEnd(index, this.isScrolling())
      }
    })
    this._navs = {}
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  isScrolling () {
    return () => this._scrolling
  }

  _updateNavScale (offset) {
    const space = this.space + this.props.tabNavItemWidth
    this.props.tabs.forEach((item, index) => {
      let min = (index - 1) * space
      let max = (index + 1) * space
      let center = index * space

      let scale = 0
      if (offset > min && offset < center) {
        scale = (offset - min) / space
      }
      if (offset > center && offset < max) {
        scale = (max - offset) / space
      }

      if (offset === center) {
        scale = 1
      }
      this._navs[index].setNativeProps({
        style: this._getActiveNavItemStyle(scale)
      })
    }
    )
  }

  _animateScroll (x) {
    const {tabNavItemWidth} = this.props
    const navContentOffset = (this.space + tabNavItemWidth) / width * x
    Animated.event(
      [{
        offset: this.state.x
      }]
    )({
  offset: -navContentOffset
})
    this._updateNavScale(navContentOffset)
  }

  _onScroll (e) {
    const {contentSize = {}} = e.nativeEvent

    // 一下一行代码为解决一个奇葩的bug
    if (contentSize.height === 0 && contentSize.width === 0) { return }

    const {x} = e.nativeEvent.contentOffset
    this._scrolling = true
    this._animateScroll(x)
  }

  _onMomentumScrollBegin (e) {
    this._scrolling = true
    const offsetX = e.nativeEvent.contentOffset.x
    this._animateScroll(offsetX)
  }

  _onMomentumScrollEnd (e) {
    this._scrolling = true
    const offsetX = e.nativeEvent.contentOffset.x
    const page = parseInt(offsetX / width, 10)
    this._animateScroll(offsetX)
    if (page !== this.index) {
      typeof this.props.onPageChanged === 'function' && this.props.onPageChanged(page, this.isScrolling())
    }
    this.index = page
  }

  _onPageSelected (e) {
    const {position} = e.nativeEvent
    this.index = position
    if (position === undefined) {
      return
    }
    typeof this.props.onPageChanged === 'function' && this.props.onPageChanged(position, this.isScrolling())
  }

  _onAndroidPageScroll (e) {
    const {offset, position} = e.nativeEvent
    let x = (position + offset) * width
    this._animateScroll(x)
  }

  _onNavItemPress (index) {
    if (Platform.OS === 'ios') {
      this.scrollView.scrollTo({
        x: width * index,
        y: 0,
        animated: true
      })
    }   else {
      this.viewPager.setPage(index)
    }
  }

  _getActiveNavItemStyle (opacity) {
    return {
      borderTopColor: 'rgba(241,196,15,' + opacity + ')'
    }
  }

  _renderNavs () {
    return this.props.tabs.map((item, index) => {
      let activeStyle = this._getActiveNavItemStyle(0)
      if (index === this.index) {
        activeStyle = this._getActiveNavItemStyle(1)
      }

      return (
        <TouchableOpacity key={index} onPress={this._onNavItemPress.bind(this, index)}>
          <View ref={view => this._navs[index] = view} key={index}
            style={[styles.navItem, { width: this.props.tabNavItemWidth }, activeStyle]}>

            <Text accessibilityLabel={item} style={styles.itemText}>
              { item }
            </Text>

          </View>
        </TouchableOpacity>
      )
    })
  }

  _renderChildren () {
    return this.props.children.map((pageContent, index) => {
      return (
        <View
          key={'pageScrollView' + index}
          style={styles.page}>
          { pageContent }
        </View>
      )
    })
  }

  _renderPageScroll () {
    const initContentOffset = {
      x: this.index * width,
      y: 0
    }

    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          horizontal
          pagingEnabled
          directionalLockEnabled
          removeClippedSubviews
          scrollEnabled
          ref={view => this.scrollView = view}
          contentOffset={initContentOffset}
          alwaysBounceVertical={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollsToTop={false}
          scrollEventThrottle={16}
          onScroll={this._onScroll.bind(this)}
          onMomentumScrollBegin={this._onMomentumScrollBegin.bind(this)}
          onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
          keyboardDismissMode='on-drag'
        >

          { this._renderChildren() }

        </ScrollView>
      )
    }
    return (
      <ViewPagerAndroid
        ref={(view) => this.viewPager = view}
        initialPage={this.index}
        style={styles.scrollableContentAndroid}
        onPageSelected={this._onPageSelected.bind(this)}
        onPageScroll={this._onAndroidPageScroll.bind(this)}>

        { this._renderChildren() }

      </ViewPagerAndroid>
    )
  }

  render () {
    return (
      <View style={[ styles.container, this.props.style ]}>
        <View style={[styles.navWrapper, { width: this.navContentWidth }]}>
          <View key='statusBarSpace' style={styles.statusBarSpace} />
          <Animated.View key='nav' style={[styles.nav, {
            width: this.navContentWidth,
            transform: [{translateX: this.state.x}]
          }]}>
            <View key='start' style={[styles.navItem, { width: this.props.tabNavItemWidth }]} />

            { this._renderNavs() }

            <View key='end' style={[styles.navItem, { width: this.props.tabNavItemWidth }]} />
          </Animated.View>
        </View>

        { this._renderPageScroll() }

      </View>
    )
  }
}

const statusBarSpace = Platform.OS === 'ios' ? 20 : 0

const styles = StyleSheet.create({
  navWrapper: {
    height: 40 + statusBarSpace,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  statusBarSpace: {
    height: statusBarSpace
  },
  nav: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navItem: {
    height: 40,
    borderTopWidth: 4,
    borderTopColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    flex: 1
  },
  page: {
    width,
    backgroundColor: 'white'
  },
  scrollableContentAndroid: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1
  }
})

export default ScrollableTabs
