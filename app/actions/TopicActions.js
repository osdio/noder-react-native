var types = require('../constants/ActionTypes')
var TopicService = require('../services/TopicService')


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
