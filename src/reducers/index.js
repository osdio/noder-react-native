import { combineReducers } from 'redux';
import home from './home';
import user from './user';
import loginUI from './loginUI';

export default combineReducers({
	home,
	user,
	loginUI
});
