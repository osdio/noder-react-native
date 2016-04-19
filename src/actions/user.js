import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as userService from '../services/userService';
import * as tokenService from '../services/token';
import * as topicService from '../services/topicService';
import * as messageService from '../services/messageService';

export const checkToken = createAction(types.CHECK_TOKEN, async(token)=> {
	const userLoginInfo = await userService.req.checkToken(token);
	const user = await userService.req
		.getUserInfo(userLoginInfo.loginname)
		.then((data)=> {
			return {
				secret: userLoginInfo,
				publicInfo: data
			};
		});
	tokenService.setToken(token);
	return user;
}, (token, resolved)=> {
	return {
		resolved: resolved,
		sync: 'user'
	}
});


export const getUserFromStorage = createAction(types.GET_USER_FROM_STORAGE, async()=> {
	return await userService.storage.getUser()
		.then(user=> {
			tokenService.setToken(user.secret.token);
			return user;
		});
}, (resolved)=> {
	return {
		resolved
	}
});


export const updateClientUserInfo = createAction(types.UPDATE_CLIENT_USER_INFO, async(user)=> {
	return await userService.req.getUserInfo(user.secret.loginname)
		.then(userInfo=> {
			if (userInfo) {
				return userInfo;
			}
			throw 'getUserInfoError'
		});
}, ()=> {
	return {
		sync: 'user'
	}
});


export const getUserInfo = createAction(types.GET_USER_INFO, async(loginName)=> {
	return await userService.req.getUserInfo(loginName)
		.then(userInfo=> {
			if (userInfo) {
				return userInfo;
			}
			throw 'getUserInfoError'
		});
}, (userName)=> {
	return {
		userName,
		sync: 'user'
	}
});


export const logout = function () {
	return {
		type: types.LOGOUT,
		meta: {
			sync: 'user'
		}
	}
};

export const clear = function () {
	topicService.storage.removeAllTopics();
	messageService.storage.clear();
	return {
		type: types.CLEAR
	}
};
