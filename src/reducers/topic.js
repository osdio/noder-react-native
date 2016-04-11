import * as types from '../constants/ActionTypes';


const initialState = {
	ask: [],
	share: [],
	job: [],
	good: [],
	all: [],
	topics: {}
};


function indexOf(id, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id == id) {
			return i;
		}
	}
	return -1;
}


function remove(id, arr) {
	let index = arr.indexOf(id);
	let result = arr.concat([]);
	if (index > -1) {
		result.splice(index, 1);
	}
	return result;
}


function upReply(topicId, replyId, userId, state, isUp) {
	let topic = state.topics[topicId];
	if (!topic) return state;
	let replies = topic.replies.concat([]);
	let index = indexOf(replyId, replies);
	if (index == -1) return state;
	let reply = {
		...replies[index]
	};

	if (isUp) {
		// up reply
		reply.ups = reply.ups.concat([userId]);
	}
	else {
		// down reply
		reply.ups = remove(userId, reply.ups);
	}
	replies[index] = reply;
	return {
		...state,
		topics: {
			...state.topics,
			[topicId]: {
				...topic,
				replies: replies
			}
		}
	};
}


export default function (state = initialState, action) {
	const {payload, error, meta = {}, type} = action;
	const {sequence = {}, tab, id = '0', replyId = '0', userId = '0'} = meta;

	if (sequence.type === 'start' || error) {
		return state;
	}

	switch (type) {
		case types.GET_TOPICS_FROM_STORAGE:
			return {
				...state,
				...payload
			};
		case types.GET_TOPICS_BY_TAB:
			return {
				...state,
				[tab]: state[tab].concat(payload)
			};
		case types.UPDATE_TOPICS_BY_TAB:
			return {
				...state,
				[tab]: payload
			};
		case types.GET_TOPIC_BY_ID:
			return {
				...state,
				topics: {
					...state.topics,
					[id]: payload
				}
			};
		case types.REMOVE_TOPIC_CACHE_BY_ID:
			delete state.topics[id];
			return {
				...state,
				topics: {
					...state.topics,
					[id]: undefined
				}
			};
		case types.UP_REPLY:
			return upReply(id, replyId, userId, state, payload);
		default:
			return state;
	}
}
