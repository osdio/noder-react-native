import * as types from '../constants/ActionTypes';

const tabs = ['good', 'ask', 'all', 'share', 'job'];

let initialState = {
	tabStatus: {}
};

tabs.forEach((item)=> {
	initialState.tabStatus[item] = {
		pullRefreshPending: false,
		reachedEndPending: false,
		page: 0,
		limit: 10
	}
});


export default function (state = initialState, action) {
	const {payload, error, meta, type} = action;

	switch (type) {
		case types.OPEN_LOGIN_MODAL:
		case types.CLOSE_LOGIN_MODAL:
			return {
				loginModalVisible: payload.show
			};
		default:
			return state;
	}
}

