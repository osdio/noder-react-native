var types = require('../constants/ActionTypes')


var initialState = null

function unLikeTopic(state, id) {
    var collections = state.collect_topics
    var index = -1
    for (var i = 0; i < collections.length; i++) {
        if (collections[i].id == id) {
            index = i
        }
    }
    if (index > -1) {
        collections.splice(index, 1)
    }
    return {
        ...state,
        collect_topics: collections
    }
}

module.exports = function (state, action) {
    state = state || initialState
    switch (action.type) {
        case types.GET_USER:
            return action.user

        case types.FETCH_USER:
            return action.user

        case types.LIKE_TOPIC:
            return {
                ...state,
                collect_topics: [action.topic].concat(state.collect_topics)
            }

        case types.UN_LIKE_TOPIC:
            return unLikeTopic(state, action.id)

        default:
            return state
    }
}
