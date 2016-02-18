import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as topicService from '../services/topicService';


export const getAllTopicsFromStorage = createAction(types.GET_TOPICS_FROM_STORAGE, topicService.storage.getAllTopics);


export const getTopicsByTab = createAction(types.GET_TOPICS_BY_TAB, async (tab, params)=> {
	return await topicService.req.getTopicsByTab(tab, params);
}, (tab)=> {
	return {
		tab
	}
});


export const updateTopicsByTab = createAction(types.UPDATE_TOPICS_BY_TAB, async (tab)=> {
	return await topicService.req.getTopicsByTab(tab, {
		page: 1
	});
});


export const getTopicById = createAction(types.GET_TOPIC_BY_ID, topicService.req.getTopicById, (id)=> {
	return {
		id
	}
});


export const removeTopicCacheById = createAction(types.REMOVE_TOPIC_CACHE_BY_ID, (id)=> {
	return {
		id
	}
});
