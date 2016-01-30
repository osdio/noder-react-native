import * as requestService from './request';
import * as storageService from './storage';
import { getToken, setToken } from './token';


export const storage = {
	saveUser: function (user) {
		return storageService.setItem('user', user)
			.then(()=>user);
	},


	clearUser: function () {
		return storageService.removeItem('user')
			.then(()=> setToken());
	},


	getUser: function () {
		return storageService.getItem('user')
			.then(user=> {
				if (user) {
					return user;
				}
				throw 'UserIsEmpty'
			});
	}
};


export const req = {
	checkToken: function (token) {
		return requestService.post('/accesstoken', {
				accesstoken: token
			})
			.then(data => {
				if (data.success) {
					data.token = token;
					return data
				}
				throw 'wrong token'
			});
	},


	getUserInfo: function (userLoginName) {
		return requestService.get('/user/' + userLoginName)
			.then((data)=>data.data);
	}
};
