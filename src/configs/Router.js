import React,{
	Navigator
} from 'react-native';
import _ from 'lodash';
import * as About from '../layouts/About';
import * as QRCode from '../layouts/QRCode';
import * as Login from '../layouts/Login';
import * as User from '../layouts/User';
import * as Message from '../layouts/Message';
import * as CustomSceneConfigs from '../configs/sceneConfig';
import connectComponent from '../utils/connectComponent';

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
		route.sceneConfig = route.sceneConfig ? route.sceneConfig : CustomSceneConfigs.customFloatFromRight;
		route.id = _.uniqueId();
		route.component = connectComponent(route.component);
		this.navigator.push(route);
	}


	pop() {
		this.navigator.pop();
	}


	toAbout(props) {
		this.push(props, {
			component: About,
			name: 'about',
			sceneConfig: CustomSceneConfigs.customFloatFromBottom
		});
	}


	toLogin(props) {
		this.push(props, {
			component: Login,
			name: 'login',
			sceneConfig: CustomSceneConfigs.customFloatFromBottom
		})
	}


	toQRCode(props) {
		this.push(props, {
			component: QRCode,
			name: 'qrcode',
			sceneConfig: CustomSceneConfigs.customFloatFromBottom
		});
	}


	toUser(props) {
		this.push(props, {
			component: User,
			name: 'user'
		});
	}


	toMessage(props) {
		this.push(props, {
			component: Message,
			name: 'message'
		})
	}
}


export default Router;
