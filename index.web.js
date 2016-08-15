import React from 'react';
import {AppRegistry} from 'react-native';
import Noder from './src';


AppRegistry.registerComponent('noder', () => Noder);

var app = document.createElement('div');
document.body.appendChild(app);

AppRegistry.runApplication('noder', {
    rootTag: app
});
