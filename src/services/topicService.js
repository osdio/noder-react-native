import * as requestService from './request';
import * as storageService from './storage';
import { getToken, setToken } from './token';

const tabs = ['good', 'ask', 'all', 'share', 'job'];

function filterData(data) {
	return data.data;
}


// 读取缓存
export const storage = {
	getTopicsByTab: function (tab) {
		return storageService.getItem('tab_' + tab)
			.then(topics=> {
				if (topics) {
					return topics
				}
				throw 'topicsInStorageIsEmpty'
			})
	},


	getAllTopics: function () {
		return storageService.multiGet(tabs.map(tab=> {
				return 'tab_' + tab
			}))
			.then(arr=> {
				let ob = {};
				arr.forEach((item)=> {
					if (!item[1]) {
						throw 'topicsIsEmpty';
					}
					ob[item[0].replace('tab_', '')] = item[1];
				});
				return ob;
			});
	},


	removeAllTopics: function () {
		return storageService.multiRemove(tabs.map(tab=> {
			return 'tab_' + tab
		}))
	}
};


// 从远程api获取数据
export const req = {
	getTopicsByTab: function (tab = 'all', params = {}) {
		return requestService.get('/topics', {
				tab,
				page: 1,
				limit: 10,
				...params
			})
			.then(filterData)
			.then(topics => {
				if ((params.page == 1 || !params.page) && topics) {
					storageService.setItem('tab_' + tab, topics)
				}
				return topics
			})
	},


	getTopicById: function (id) {
		return requestService.get('/topic/' + id)
			.then(data=>data.data)
			.then(topic=> {
				if (topic && topic.id) {
					return topic
				}
				throw 'getTopicById Error'
			})
	},


	reply: function (topicId, content, replyId) {
		let body = {
			accesstoken: getToken(),
			content: content
		};
		if (replyId) {
			body.reply_id = replyId
		}
		let url = `/topic/${topicId}/replies`;

		return requestService.post(url, body)
			.then(data=> {
				if (data.success) {
					return data.reply_id
				}
				else {
					throw 'do reply failed'
				}
			})
	},


	upComment: function (replyId) {
		let body = {
			accesstoken: getToken()
		};

		let url = `/reply/${replyId}/ups`;

		return requestService.post(url, body)
			.then(data=> {
				if (data.success) {
					return data.action == 'up'
				}
				else {
					throw 'do reply failed'
				}
			})
	},


	publish: function (title, tab, content) {
		const body = {
			title: title,
			tab: tab,
			content: content,
			accesstoken: getToken()
		};
		return requestService.post('/topics', body)
			.then(data=> {
				if (data.success) {
					return data.topic_id
				}
				throw 'publish failed'
			})
	}
};
