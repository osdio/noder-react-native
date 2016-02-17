import * as types from '../constants/ActionTypes';


const initialState = {
	ask: [],
	share: [],
	job: [],
	good: [],
	all: []
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
		default:
			return state;
	}
}
