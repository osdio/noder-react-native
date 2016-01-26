import * as types from '../constants/ActionTypes';

const initialState = {
	test: false
};


export default function (state, action) {
	state = state || initialState
	switch (action.type) {
		case types.TEST:
			return {
				test: !state.test
			};
		default :
			return state
	}
}
