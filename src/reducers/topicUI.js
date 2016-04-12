import * as types from '../constants/ActionTypes';


const initialState = {
	loadPending: {},
	replyPending: {},
	upPending: {},
	publishPending: false
};

export default function (state = initialState, action) {
	const {type, meta={}} = action;
	const {sequence={}} = meta;
	const {id} = meta;
	const status = sequence.type == 'start';

	switch (type) {
		case types.GET_TOPIC_BY_ID:
			return {
				...state,
				loadPending: {
					...state.loadPending,
					[id]: status
				}
			};
		case types.REPLY_TOPIC_BY_ID:
			return {
				...state,
				replyPending: {
					...state.replyPending,
					[id]: status
				}
			};
		case types.UP_REPLY:
			return {
				...state,
				upPending: {
					...state.upPending,
					[id]: status
				}
			};
		case types.PUBLISH:
			return {
				...state,
				publishPending: status
			};
		default:
			return state;
	}
}
