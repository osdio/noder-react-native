import React,{
	Component,
	PropTypes,
	Navigator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Home from './Home';
import Router from '../configs/Router';
import actions from '../actions';


console.log(actions);

const initialRoute = {
	name: 'home',
	index: 0,
	component: Home
};


class Navigation extends Component {
	componentDidMount() {
		this.navigator.navigationContext.addListener('didfocus', e => {
			let route = e.data.route;
			this[route.name] && this[route.name].componentDidFocus && this[route.name].componentDidFocus();
		});
	}


	renderScene(route, navigator) {
		this.router = this.router || new Router(navigator);
		let { component } = route;
		if (component) {
			let { mapStateToProps, mapDispatchToProps, LayoutComponent } = component;
			component = connect(
				mapStateToProps || function (state) {
					return state;
				},
				mapDispatchToProps || function (dispatch) {
					return {
						actions: bindActionCreators(actions, dispatch)
					}
				}
			)(LayoutComponent);
			return React.createElement(component, {
				...route.props,
				ref: view=>this[route.name] = view,
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
			<Navigator
				ref={view => this.navigator=view}
				initialRoute={initialRoute}
				configureScene={this.configureScene.bind(this)}
				renderScene={this.renderScene.bind(this)}
			/>
		)
	}
}


export default Navigation;
