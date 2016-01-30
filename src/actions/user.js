import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as userService from '../services/userService';
import * as tokenService from '../services/token';
import * as storageService from '../services/storage';


export const checkToken = createAction(types.CHECK_TOKEN, async (token)=> {
	const userLoginInfo = await userService.req.checkToken(token);
	const user = await userService.req
		.getUserInfo(userLoginInfo.loginname)
		.then((data)=> {
			return {
				secret: userLoginInfo,
				publicInfo: data
			};
		});
	return await userService.storage.saveUser(user);
});


export const getUserFromStorage = createAction(types.GET_USER_FROM_STORAGE, async ()=> {
	return await userService.storage.getUser()
		.then(user=> {
			tokenService.setToken(user.token);
			return user;
		});
});


export const updateClientUserInfo = createAction(types.UPDATE_CLIENT_USER_INFO, async (user)=> {
	return await userService.req.getUserInfo(user.secret.loginname)
		.then(userInfo=> {
			if (userInfo) {
				storageService.setItem('user', {
					...user,
					publicInfo: userInfo
				});
				return userInfo;
			}
			throw 'getUserInfoError'
		});
});


export const getUserInfo = createAction(types.GET_USER_INFO, async (loginName)=> {
	return await userService.req.getUserInfo(loginName)
		.then(userInfo=> {
			if (userInfo) {
				return userInfo;
			}
			throw 'getUserInfoError'
		});
});


export const logout = createAction(types.LOGOUT, async ()=> {
	return userService.storage.clearUser();
});
