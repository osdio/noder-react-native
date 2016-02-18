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
		this.tabCount = tabs.length;
		this.space = (width - tabNavItemWidth * 3) / 2;
		this.navContentWidth = (tabs.length + 2) * tabNavItemWidth + this.space * (tabs.length + 1);
		this.index = props.index || Math.floor(tabs.length / 2);
		const offset = this.index * (this.space + tabNavItemWidth);
		this.state = {
			x: new Animated.Value(-offset)
		};
		this._navs = {};
	}


	_updateNavScale(offset) {
		const space = this.space + this.props.tabNavItemWidth;
		this.props.tabs.forEach((item, index)=> {
				let min = (index - 1) * space;
				let max = (index + 1) * space;
				let center = index * space;

				let scale = 0;
				if (offset > min && offset < center) {
					scale = (offset - min) / space;
				}
				if (offset > center && offset < max) {
					scale = (max - offset) / space;
				}

				if (offset == center) {
					scale = 1;
				}
				this._navs[index].setNativeProps({
					style: this._getActiveNavItemStyle(scale)
				});
			}
		);
	}


	_onScroll(e) {
		const { x } = e.nativeEvent.contentOffset;
		const { tabNavItemWidth } = this.props;
		const navContentOffset = (this.space + tabNavItemWidth) / width * x;
		if (x % width === 0) {
			this.index = x / width;
		}
		Animated.event(
			[{
				offset: this.state.x
			}]
		)({
			offset: -navContentOffset
		});
		this._updateNavScale(navContentOffset);
	}


	_onTouchStart(e) {
		console.log('start');
		this.touchstart = e.nativeEvent.pageX;
		this.touchstartTimestamp = e.nativeEvent.timeStamp;
	}


	_onTouchMove(e) {
		console.log('move');
	}


	_onTouchEnd(e) {
		console.log('end');
		const { pageX, timeStamp } = e.nativeEvent;
		const distance = pageX - this.touchstart;
		const time = timeStamp - this.touchstartTimestamp;
		const v = distance / time;
		let x;
		if (Math.abs(distance) > this.space) {
			// swipe to right
			if (v < 0) {
				if (this.index > 0 || this.index < this.tabCount - 1) {
					this.index++;
				}
				x = this.index * width;
			}
			else {
				if (this.index > 0 || this.index < this.tabCount - 1) {
					this.index--;
				}
				this.index--;
				x = this.index * width;
			}
		}
		else {
			x = this.index * width;
		}

		this.scrollView.scrollTo({
			x,
			y: 0,
			animated: true
		});
	}


	_getActiveNavItemStyle(opacity) {
		return {
			borderTopColor: 'rgba(241,196,15,' + opacity + ')'
		}
	}


	_renderNavs() {
		return this.props.tabs.map((item, index)=> {
			let activeStyle = this._getActiveNavItemStyle(0);
			if (index === this.index) {
				activeStyle = this._getActiveNavItemStyle(1)
			}

			return (
				<View ref={ view => this._navs[index]=view} key={index}
					  style={[styles.navItem, { width: this.props.tabNavItemWidth }, activeStyle]}>
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
		const androidProps = Platform.OS === 'android' ? {
			onTouchStart: this._onTouchStart.bind(this),
			onTouchEnd: this._onTouchEnd.bind(this),
			onTouchMove: this._onTouchMove.bind(this)
		} : {};


		return (
			<View style={[ styles.container, this.props.style ]}>
				<View style={[styles.navWrapper, { width: this.navContentWidth }]}>
					<View key="statusBarSpace" style={styles.statusBarSpace}/>
					<Animated.View key="nav" style={[styles.nav, {
						width: this.navContentWidth,
						transform: [{translateX: this.state.x}]
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
					showsVerticalScrollIndicator={false}
					{...androidProps}>

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
