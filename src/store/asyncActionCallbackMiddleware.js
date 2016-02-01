export default function asyncActionCallbackMiddleware() {
	return next => action => {
		const { meta = {}, error, payload } = action;
		const { sequence = {}, resolved, rejected } = meta;
		if (sequence.type !== 'next') return next(action);


		// 执行回调
		error ? (rejected && rejected(payload)) : (resolved && resolved(payload));

		next(action);
	}
}
