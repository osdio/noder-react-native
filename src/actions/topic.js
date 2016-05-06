import {createAction} from 'redux-actions';
import * as markdown from 'markdown';
import * as types from '../constants/ActionTypes';
import * as topicService from '../services/topicService';


function setMetaId(id) {
	return {
		id
	}
}


export const getTopicsByTab = createAction(types.GET_TOPICS_BY_TAB, async(tab, params)=> {
	return await topicService.getTopicsByTab(tab, params);
}, (tab)=> {
	return {
		tab
	}
});


export const updateTopicsByTab = createAction(types.UPDATE_TOPICS_BY_TAB, async(tab)=> {
	return await topicService.getTopicsByTab(tab, {
		page: 1
	});
}, (tab)=> {
	return {
		tab,
		sync: 'topic'
	}
});


export const getTopicById = createAction(types.GET_TOPIC_BY_ID, topicService.getTopicById, (id)=> {
	return {
		id,
		sync: 'topic'
	}
});


export const removeTopicCacheById = createAction(types.REMOVE_TOPIC_CACHE_BY_ID, (id)=> {
	return {
		id
	}
});


export const replyTopicById = createAction(types.REPLY_TOPIC_BY_ID, topicService.reply, ({topicId, content, replyId, user}, resolved, rejected)=> {
	return {
		id: topicId,
		content: markdown.parse(content),
		replyId,
		resolved,
		rejected,
		user
	}
});


export const upReply = createAction(types.UP_REPLY, topicService.upReply, ({topicId, replyId, userId, resolved, rejected})=> {
	return {
		id: topicId,
		replyId,
		userId,
		resolved,
		rejected
	}
});


export const publish = createAction(types.PUBLISH, topicService.publish, ({resolved, rejected})=> {
	return {
		resolved,
		rejected
	}
});
