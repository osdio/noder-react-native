import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as userService from '../services/userService';


// for test
async function _setTimeout() {
	return new Promise((resolve, reject)=> {
		setTimeout(()=> {
			resolve();
		}, 3000);
	});
}

export const checkToken = createAction(types.CHECK_TOKEN, async (token)=> {
	const timeout = await _setTimeout();
	const userLoginInfo = await userService.req.checkToken(token);
	const user = await userService.req
		.getUserInfo(userLoginInfo.loginname)
		.then((data)=> {
			return {
				userLoginInfo,
				user: data
			}
		});

	return user;
});
