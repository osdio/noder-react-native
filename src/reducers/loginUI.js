import * as types from '../constants/ActionTypes';


const initialState = {
	checkTokenLoading: false
};

export default function (state = initialState, action) {
	const { type, meta={} } = action;
	const { sequence={} } = meta;

	switch (type) {
		case types.CHECK_TOKEN:
			return {
				...state,
				checkTokenLoading: sequence.type === 'start'
			};
		default:
			return state;
	}
}
