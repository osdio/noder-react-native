import React, {
	View,
	Component,
	Dimensions,
	PropTypes,
	StyleSheet,
	TouchableOpacity,
	Text,
	Platform,
	ScrollView,
	Animated
} from 'react-native';


const { height, width } = Dimensions.get('window');


class ScrollableTabs extends Component {
	static propTypes = {
		tabs: PropTypes.array,
		tabNavItemWidth: PropTypes.number,
		index: PropTypes.number
	};

	static defaultProps = {
		tabs: [],
		tabNavItemWidth: 60
	};


	constructor(props) {
		super(props);
		const { tabNavItemWidth, tabs } = props;
		this.space = (width - tabNavItemWidth * 3) / 2;
		this.navContentHeight = (tabs.length + 2) * tabNavItemWidth + this.space * (tabs.length + 1);
		this.index = props.index || Math.floor(tabs.length / 2);
		this.state = {
			scroll: new Animated.Value(0)
		};
	}


	_onScroll(...args) {
		console.log(args[0].nativeEvent);
		Animated.event(
			[{nativeEvent: {contentOffset: {x: this.state.scroll}}}]
		)(...args);
	}


	_getActiveNavItemStyle(opacity) {
		return {
			borderTopColor: 'rgba(241,196,15,' + opacity + ')'
		}
	}


	_renderNavs() {
		return this.props.tabs.map((item, index)=> {
			let activeStyle = this._getActiveNavItemStyle(0)
			if (index == this.props.index) {
				activeStyle = this._getActiveNavItemStyle(1)
			}

			return (
				<View key={index} style={[styles.navItem, { width: this.props.tabNavItemWidth }, activeStyle]}>
					<TouchableOpacity>
						<Text style={styles.itemText}>
							{ item }
						</Text>
					</TouchableOpacity>
				</View>
			)
		});
	}


	render() {
		return (
			<View style={[ styles.container, this.props.style ]}>
				<View style={[styles.navWrapper, { width: this.navContentHeight }]}>
					<View key="statusBarSpace" style={styles.statusBarSpace}/>
					<Animated.View key="nav" style={[styles.nav, {
						width: this.navContentHeight,
						transform: [{translateX: this.state.scroll}]
					}]}>
						<View key='start' style={[styles.navItem, { width: this.props.tabNavItemWidth }]}/>

						{ this._renderNavs() }

						<View key='end' style={[styles.navItem, { width: this.props.tabNavItemWidth }]}/>
					</Animated.View>
				</View>


				{/* scroll page */}

				<ScrollView
					style={styles.scrollView}
					ref={view=>this.scrollView=view}
					contentOffset={{
								x: this.index * width,
								y: 0
							}}
					bounces={true}
					horizontal={true}
					directionalLockEnabled={true}
					scrollEventThrottle={16}
					pagingEnabled={true}
					scrollEnabled={true}
					onScroll={this._onScroll.bind(this)}
					automaticallyAdjustContentInsets={false}
					removeClippedSubviews={true}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}>

					{this.props.children.map((pageContent, index)=> {
						return (
							<View
								key={'pageScrollView'+index}
								style={[styles.page, this.props.pageStyle]}>
								{pageContent}
							</View>
						)
					})}
				</ScrollView>
			</View>
		)
	}
}


const statusBarSpace = Platform.OS === 'ios' ? 20 : 0;


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
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
		justifyContent: 'space-between',
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
		color: 'rgba(255,255,255,0.7)'
	},
	page: {
		width
	},
	scrollView: {
		backgroundColor: 'white',
		width
	}
});


export default ScrollableTabs;
