import React,{
	Navigator
} from 'react-native';
import * as About from '../layouts/About';
import * as QRCode from '../layouts/QRCode';
import * as Login from '../layouts/Login';


const { SceneConfigs } = Navigator;

class Router {
	constructor(navigator) {
		this.navigator = navigator;
	}

	push(props = {}, route) {
		let routesList = this.navigator.getCurrentRoutes();
		let nextIndex = routesList[routesList.length - 1].index + 1;
		route.props = props;
		route.index = nextIndex;
		this.navigator.push(route);
	}


	pop() {
		this.navigator.pop();
	}


	toAbout(props) {
		this.push(props, {
			component: About,
			name: 'about',
			sceneConfig: SceneConfigs.FloatFromBottom
		});
	}


	toLogin(props) {
		this.push(props, {
			component: Login,
			name: 'login',
			sceneConfig: SceneConfigs.FloatFromBottom
		})
	}


	toQRCode(props) {
		this.push(props, {
			component: QRCode,
			name: 'qrcode',
			sceneConfig: SceneConfigs.FloatFromBottom
		});
	}
}


export default Router;
