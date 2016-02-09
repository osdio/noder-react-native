import * as types from '../constants/ActionTypes';


const initialState = {
	fetchMessagesPending: false,
	fetchUnreadMessageCountPending: false,
	markAsReadPending: false
};

export default function (state = initialState, action) {
	const { type, meta={} } = action;
	const { sequence={} } = meta;

	switch (type) {
		case types.GET_MESSAGES_LIST:
			return {
				...state,
				fetchMessagesPending: sequence.type === 'start'
			};
		case types.MARK_AS_READ:
			return {
				...state,
				markAsReadPending: sequence.type === 'start'
			};
		case types.GET_UNREAD_MESSAGE_COUNT:
			return {
				...state,
				fetchUnreadMessageCountPending: sequence.type === 'start'
			};
		default:
			return state;
	}
}
