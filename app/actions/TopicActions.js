var types = require('../constants/ActionTypes')
var TopicService = require('../services/topicService')


exports.fetchTopicsByTab = function (params, cbs) {
    return dispatch=> {
        dispatch({
            type: types.FETCH_TOPICS_BY_TAB_REQUEST,
            tab: params.tab
        })
        cbs = cbs || {}
        cbs.request && cbs.request()

        TopicService.req.getTopicsByTab(params)
            .then(topics=> {
                console.log('fetchedTopics');
                dispatch({
                    type: types.FETCH_TOPICS_BY_TAB_SUCCESS,
                    tab: params.tab,
                    topics: topics
                })
                cbs.success && cbs.success()
            })
            .catch(()=> {
                dispatch({
                    type: types.FETCH_MESSAGES_FAILED,
                    tab: params.tab
                })
                cbs.failed && cbs.failed()
            })
            .done()
    }
}


exports.getAllTopicsFromStorage = function () {
    return dispatch=> {
        TopicService.storage.getAll()
            .then(results=> {
                dispatch({
                    type: types.GET_ALL_TOPICS_FROM_STORAGE,
                    results: results
                })
            })
            .catch(err=> {

            })
            .done()
    }
}


exports.getTopicsByTab = function (topics, tab) {
    return {
        type: types.GET_TOPICS,
        topics: topics,
        tab: tab
    }
}


exports.updateTopicsByTab = function (topics, tab) {
    return {
        type: types.UPDATE_TOPICS,
        topics: topics,
        tab: tab
    }
}
