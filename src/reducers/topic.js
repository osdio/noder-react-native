import * as types from '../constants/ActionTypes';


const initialState = {
	ask: [],
	share: [],
	job: [],
	good: [],
	all: [],
	topics: {}
};


export default function (state = initialState, action) {
	const { payload, error, meta = {}, type } = action;
	const { sequence = {}, tab } = meta;
	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		case types.GET_TOPICS_FROM_STORAGE:
			return {
				...state,
				...payload
			};
		case types.GET_TOPICS_BY_TAB:
			return {
				...state,
				[tab]: state[tab].concat(payload)
			};
		case types.UPDATE_TOPICS_BY_TAB:
			return {
				...state,
				[tab]: payload
			};
		case types.GET_TOPIC_BY_ID:
			let { id = '' } = meta;
			return {
				...state,
				topics: {
					...state.topics,
					[id]: payload
				}
			};
		case types.REMOVE_TOPIC_CACHE_BY_ID:
			delete state.topics[id];
			return state;
		default:
			return state;
	}
}
