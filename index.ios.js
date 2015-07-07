'use strict';

var React = require('react-native');
var Home = require('./app/scene/home');
var Topic = require('./app/scene/topic');
var QRCode = require('./app/scene/qrCode');
var Message = require('./app/scene/message');
var Comments = require('./app/scene/comments');
var Storage = require('./app/util/storage');
var User = require('./app/scene/user');

// Mock data
//var topic = require('./app/mock/topic');
//var user = require('./app/mock/user');
//var userInfo = require('./app/mock/userInfo').data;


// When the app loading
require('./app/config/onRun')

var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	Component,
	StatusBarIOS
	} = React;


var styles = StyleSheet.create({
	sceneStyle: {
		flex: 1
	}
});


class Noder extends Component {
	constructor(props) {
		super(props)
		//Storage.setItem('user', user)
		//Storage.removeItem('user')
		//Storage.removeItem('userInfo')
	}


	renderScene(route, navigator) {
		if (route.name == 'home') {
			return (
				//<User
				//    userName='alsotang'
				//    //user={user}
				//    //userInfo={userInfo}
				//    ></User>
				//<Test navigator={navigator}></Test>
				<Home ref={view=>this[route.name]=view} navigator={navigator}></Home>
				//<Message></Message>
				//<Topic navigator={navigator} topic={topic.data}></Topic>
				//<Comments topic={topic.data} user={user}></Comments>
				//<QRCode></QRCode>

			);
		}
		if (route.component) {
			return React.createElement.bind(this)(route.component, Object.assign({}, route.props, {ref: view=>this[route.name] = view}))
		}
	}

	render() {
		return (
			<Navigator
				initialRoute={{name:'home', index:0}}
				configureScene={(route)=>{
                    if(route.sceneConfig){
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
				renderScene={this.renderScene.bind(this)}
				onDidFocus={(route)=>{
                    this[route.name]&&this[route.name].componentDidFocus && this[route.name].componentDidFocus()
                }}
				/>
		)
	}
}

AppRegistry.registerComponent('noder', () => Noder);
