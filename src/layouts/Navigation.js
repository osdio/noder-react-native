import React,{
	Component,
	PropTypes,
	Navigator,
	StyleSheet,
	View,
	Text
} from 'react-native';
import * as Home from './Home';
import * as UtilsComponent from './Utils';
import Router from '../configs/Router';
import connectComponent from '../utils/connectComponent';

const Utils = connectComponent(UtilsComponent);


const initialRoute = {
	name: 'home',
	index: 0,
	component: Home
};


class Navigation extends Component {
	componentDidMount() {
		this.navigator.navigationContext.addListener('didfocus', ({ data:{ route: { name } }}) => {
			this[name] && this[name] && this[name].getWrappedInstance().componentDidFocus();
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
			<View style={styles.container}>
				<Navigator
					ref={view => this.navigator=view}
					initialRoute={initialRoute}
					configureScene={this.configureScene.bind(this)}
					renderScene={this.renderScene.bind(this)}/>
				<Utils/>
			</View>
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
	}
});


export default Navigation;
