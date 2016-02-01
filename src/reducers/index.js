import { combineReducers } from 'redux';
import home from './home';
import user from './user';
import userUI from './userUI';
import utils from './utils';

export default combineReducers({
	home,
	user,
	userUI,
	utils
});
