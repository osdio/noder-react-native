import React,{
	Component,
	PropTypes,
	Navigator,
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions
} from 'react-native';
import * as Home from './Home';
import * as UtilsComponent from './Utils';
import Router from '../configs/Router';
import connectComponent from '../utils/connectComponent';
import config from '../configs';

const Utils = connectComponent(UtilsComponent);

const { height, width } = Dimensions.get('window');
const initialRoute = {
	name: 'home',
	index: 0,
	component: Home
};


class Navigation extends Component {
	componentDidMount() {
		this.navigator.navigationContext.addListener('didfocus', e => {
			let route = e.data.route;
			this[route.name] && this[route.name] && this[route.name].getWrappedInstance().componentDidFocus && this[route.name].getWrappedInstance().componentDidFocus();
		});
	}


	renderScene({ component, name, props }, navigator) {
		this.router = this.router || new Router(navigator);
		if (component) {
			return React.createElement(connectComponent(component), {
				...props,
				ref: view => this[name] = view,
				router: this.router
			});
		}
	}


	configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig
		}
		return Navigator.SceneConfigs.FloatFromRight
	}


	render() {
		return (
			<Image
				source={{ uri: config.bgImgUri }}
				style={styles.bg}>
				<Navigator
					ref={view => this.navigator=view}
					initialRoute={initialRoute}
					configureScene={this.configureScene.bind(this)}
					renderScene={this.renderScene.bind(this)}/>
				<Utils/>
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	flexCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bg: {
		flex: 1,
		height,
		width,
		backgroundColor: 'transparent'
	}
});


export default Navigation;
