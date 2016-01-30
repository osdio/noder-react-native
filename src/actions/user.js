import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as userService from '../services/userService';
import * as tokenService from '../services/token';


const fetchUserPublicInfo = async (loginName)=> {
	return await userService.req.getUserInfo(loginName);
};


export const checkToken = createAction(types.CHECK_TOKEN, async (token)=> {
	const userLoginInfo = await userService.req.checkToken(token);
	const user = await userService.req
		.getUserInfo(userLoginInfo.loginname)
		.then((data)=> {
			return {
				secret: userLoginInfo,
				public: data
			};
		});
	return await userService.storage.saveUser(user);
});


export const getUserFromStorage = createAction(types.GET_USER_FROM_STORAGE, async ()=> {
	return await userService.storage.getUser()
		.then(user=> {
			tokenService.setToken(user.secret.token);
			return user;
		});
});


export const updateUserPublicInfo = createAction(types.UPDATE_USER_PUBLIC_INFO, fetchUserPublicInfo);


export const logout = createAction(types.LOGOUT, async ()=> {
	return userService.storage.clearUser();
});
