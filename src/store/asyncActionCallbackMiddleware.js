export default function asyncActionCallbackMiddleware() {
	return next => action => {
		const { meta = {}, error } = action;
		const { sequence = {}, resolved, rejected } = meta;
		if (sequence.type !== 'next') return next(action);


		// 执行回调
		error ? (rejected && rejected()) : (resolved && resolved());

		next(action);
	}
}
