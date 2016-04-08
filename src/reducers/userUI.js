import * as types from '../constants/ActionTypes';


const initialState = {
	checkTokenPending: false,
	clientUserInfoPending: false,
	otherUserPending: false
};

export default function (state = initialState, action) {
	const { type, meta={} } = action;
	const { sequence={} } = meta;

	switch (type) {
		case types.CHECK_TOKEN:
			return {
				...state,
				checkTokenPending: sequence.type === 'start'
			};
		case types.UPDATE_CLIENT_USER_INFO:
			return {
				...state,
				clientUserInfoPending: sequence.type === 'start'
			};
		case types.GET_USER_INFO:
			return {
				...state,
				otherUserPending: sequence.type === 'start'
			};
		case types.LOGOUT:
			return initialState;
		default:
			return state;
	}
}
