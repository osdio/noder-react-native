import * as types from '../constants/ActionTypes';


const initialState = {
	user: null
};


export default function (state = initialState, action) {
	const { payload, error, meta = {}, type } = action;
	const { sequence = {} } = meta;
	switch (type) {
		case types.CHECK_TOKEN:
			if (sequence.type === 'next') {
				return {
					...state,
					...payload
				};
			}
		default:
			return state;
	}
}
