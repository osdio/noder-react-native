import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';


export const test = createAction(types.TEST, ()=> {
	return {
		test: true
	}
});
