import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as messageService from '../services/messageService';


export const getUnreadMessageCount = createAction(types.GET_UNREAD_MESSAGE_COUNT, async()=> {
	return await messageService.req.getUnreadMessageCount();
});


export const markAsRead = createAction(types.MARK_AS_READ, async()=> {
	return await messageService.req.markAsRead();
}, function (resolved, rejected) {
	return {
		resolved,
		rejected,
		sync: 'message'
	}
});


export const getMessageList = createAction(types.GET_MESSAGES_LIST, async()=> {
	return await messageService.req.getMessages();
}, ()=> {
	return {
		sync: 'message'
	}
});
