import * as types from '../constants/ActionTypes';


const initialState = {
	toast: {
		text: null,
		timeout: 2000,
		id: null
	}
};


export default function (state = initialState, action) {
	const { payload ={} } = action;
	switch (action.type) {
		case types.TOAST:
			return {
				...state,
				toast: {
					...state.toast,
					...payload
				}
			};
		default :
			return state;
	}
}
