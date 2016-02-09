import * as requestService from './request';
import * as storageService from './storage';
import { getToken, setToken } from './token';


export const storage = {
	get: function () {
		return storageService.getItem('messages');
	},


	save: function (value) {
		return storageService.setItem('messages', value);
	},


	clear: function () {
		return Storage.removeItem('messages');
	}
};


export const req = {
	getMessages: function () {
		return requestService.get('/messages', {
				accesstoken: getToken()
			})
			.then((data)=>data.data)
			.then((messages)=> {
				if (messages) {
					storage.save(messages)
					return messages
				}
				else {
					throw 'getMessagesFailed'
				}
			})
	},


	markAsRead: function () {
		return requestService.post('/message/mark_all', {
				accesstoken: getToken()
			})
			.then(data=> {
				if (data.success) {
					return data
				}
				else {
					throw 'markAsReadFailed'
				}
			})
	},


	getUnreadMessageCount: function () {
		return requestService.get('/message/count', {
				accesstoken: getToken()
			})
			.then(data=>data.data)
	}
};
