import { isFSA } from 'flux-standard-action';
import _ from 'lodash';

function isPromise(val) {
	return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
	return next => action => {
		if (!isFSA(action)) {
			return isPromise(action)
				? action.then(dispatch)
				: next(action);
		}

		if (isPromise(action.payload)) {
			dispatch({
				...action,
				payload: undefined,
				meta: {
					sequence: {
						type: 'start',
						id: _.uniqueId()
					}
				}
			});

			return action.payload.then(
				result => dispatch({
					...action,
					payload: result,
					meta: {
						sequence: {
							type: 'next',
							id: _.uniqueId()
						}
					}
				}),
				error => dispatch({
					...action,
					payload: error,
					error: true,
					meta: {
						sequence: {
							type: 'next',
							id: _.uniqueId()
						}
					}
				})
			);
		}

		return next(action);
	};
}
