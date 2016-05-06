import {isFSA, createAction} from 'flux-standard-action';
import * as storageService from '../services/storage';
import * as types from '../constants/ActionTypes';


export default ({dispatch, getState}) => next => action => {
	if (!isFSA(action)) {
		return next(action);
	}

	const {meta={}, sequence={}, error, payload} = action;
	const {sync} = meta;


	if (action.type === types.SYNC_REDUCER_TO_ASYNC_STORAGE) {
		let state = getState();
		try {
			switch (payload) {
				default:
					storageService.setItem(payload, state[payload]);
			}
		}
		catch (err) {
			console.warn(err);
		}
	}


	if (!sync || sequence.type == 'start' || error) {
		return next(action);
	}


	next(action);


	setTimeout(()=> {
		dispatch({
			type: types.SYNC_REDUCER_TO_ASYNC_STORAGE,
			payload: sync
		});
	}, 16);
}
