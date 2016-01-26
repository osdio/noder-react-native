import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import reducers from '../reducers';


var middlewares = [
	thunkMiddleware,
	promiseMiddleware,
];


if (__DEV__) {
	middlewares.push(logger());
}


export default function configureStore(initialState) {
	return applyMiddleware(
		...middlewares
	)(createStore)(reducers, initialState);
}






