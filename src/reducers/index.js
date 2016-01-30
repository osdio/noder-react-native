import { combineReducers } from 'redux';
import home from './home';
import user from './user';
import userUI from './userUI';

export default combineReducers({
	home,
	user,
	userUI
});
