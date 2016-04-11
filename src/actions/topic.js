import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as topicService from '../services/topicService';


function setMetaId(id) {
	return {
		id
	}
}


export const getAllTopicsFromStorage = createAction(types.GET_TOPICS_FROM_STORAGE, topicService.storage.getAllTopics);


export const getTopicsByTab = createAction(types.GET_TOPICS_BY_TAB, async(tab, params)=> {
	return await topicService.req.getTopicsByTab(tab, params);
}, (tab)=> {
	return {
		tab
	}
});


export const updateTopicsByTab = createAction(types.UPDATE_TOPICS_BY_TAB, async(tab)=> {
	return await topicService.req.getTopicsByTab(tab, {
		page: 1
	});
}, (tab)=> {
	return {
		tab
	}
});


export const getTopicById = createAction(types.GET_TOPIC_BY_ID, topicService.req.getTopicById, setMetaId);


export const removeTopicCacheById = createAction(types.REMOVE_TOPIC_CACHE_BY_ID, (id)=> {
	return {
		id
	}
});


export const replyTopicById = createAction(types.REPLY_TOPIC_BY_ID, topicService.req.reply, ({topicId}, resolved, rejected)=> {
	return {
		id: topicId,
		resolved,
		rejected
	}
});


export const upReply = createAction(types.UP_REPLY, topicService.req.upReply, ({topicId, replyId, userId, resolved, rejected})=> {
	return {
		id: topicId,
		replyId,
		userId,
		resolved,
		rejected
	}
});
