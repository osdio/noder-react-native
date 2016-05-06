import * as requestService from './request';
import {getToken, setToken} from './token';


export function getMessages() {
	return requestService.get('/messages', {
			accesstoken: getToken()
		})
		.then((data)=>data.data)
		.then((messages)=> {
			if (messages) {
				return messages;
			}
			else {
				throw 'getMessagesFailed'
			}
		})
}


export function markAsRead() {
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
}

export function getUnreadMessageCount() {
	return requestService.get('/message/count', {
			accesstoken: getToken()
		})
		.then(data=>data.data)
}
