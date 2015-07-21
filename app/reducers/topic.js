//var React = require('react-native')
//var {ListView} = React


var types = require('../constants/ActionTypes')

var tabs = ['good', 'ask', 'all', 'share', 'job']

var initialTabState = {
    isLoading: true,
    topics: []
}


var initialState = {}


tabs.forEach(function (tab) {
    initialTabState.name = tab
    initialState[tab] = Object.assign({}, initialTabState)
})


function getTopicsFromStorage(state, action) {
    var {results} =  action

    results.forEach((item, index)=> {
        state[tabs[index]].topics = item[1] || []
    })

    return Object.assign({}, state)
}

function fetchTopicsByTabRequest(state, action) {
    var {tab} =  action
    var tabState = state[tab]
    state[tab] = {
        ...tabState,
        isLoading: true
    }
    return Object.assign({}, state)

}

function fetchTopicsByTabSuccess(state, action) {
    var {tab} =  action
    var tabState = state[tab]
    var topics = tabState.topics
    var page = state[tab].page
    if (action.loadingType == 'get') {
        topics = topics.concat(action.topics)
        page++
    }
    else {
        topics = action.topics
        page = 1
    }
    state[tab] = {
        ...tabState,
        topics: topics,
        isLoading: false,
        page: page
    }
    return Object.assign({}, state)
}


function getTopics(state, action) {
    var {tab,topics} =  action
    var tabState = state[tab]
    state[tab] = {
        ...tabState,
        topics: tabState.topics.concat(topics)
    }
    return Object.assign({}, state)
}


function updateTopics(state, action) {
    var {tab,topics} =  action
    var tabState = state[tab]

    state[tab] = {
        ...tabState,
        topics: topics
    }
    return Object.assign({}, state)
}


module.exports = function (state, action) {
    state = state || initialState

    switch (action.type) {
        case types.GET_ALL_TOPICS_FROM_STORAGE:
            return getTopicsFromStorage(state, action)

        //case types.FETCH_TOPICS_BY_TAB_REQUEST:
        //    return fetchTopicsByTabRequest(state, action)
        //
        //case types.FETCH_TOPICS_BY_TAB_SUCCESS:
        //    return fetchTopicsByTabSuccess(state, action)

        case types.GET_TOPICS:
            return getTopics(state, action)

        case types.UPDATE_TOPICS:
            return updateTopics(state, action)

        default :
            return state
    }
}
