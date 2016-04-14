import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware';
import utilsMiddleware from './utilsMiddleware';
import minPendingTimeMiddleware from './minPendingTime';
import logger from 'redux-logger';
import reducers from '../reducers';


var middlewares = [
	thunkMiddleware,
	promiseMiddleware,
	asyncActionCallbackMiddleware,
	minPendingTimeMiddleware,
	utilsMiddleware
];


if (__DEV__) {
	middlewares.push(logger());
}


export default function configureStore(initialState) {
	const store = applyMiddleware(
		...middlewares
	)(createStore)(reducers, initialState);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('../reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}






