import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as topicService from '../services/topicService';


export const getAllTopicsFromStorage = createAction(types.GET_TOPICS_FROM_STORAGE, async ()=> {
	return await topicService.storage.getAllTopics();
});


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
