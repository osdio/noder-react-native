var React = require('react-native')

var AsyncStorage = React.AsyncStorage

var Storage = {}


Storage.setItem = function (key, value) {
    if (value == null) return Promise.reject('value is null')
    return AsyncStorage.setItem(key, JSON.stringify(value))
}

Storage.getItem = function (key) {
    var result = AsyncStorage.getItem(key)
        .then(function (value) {
            return JSON.parse(value)
        })

    return result
}

Storage.clear = AsyncStorage.clear

Storage.removeItem = AsyncStorage.removeItem

Storage.multiGet = function (keys) {
    return AsyncStorage.multiGet(keys)
        .then(results=> {
            return results.map(item=> {
                return [item[0], JSON.parse(item[1])]
            })
        })
}

Storage.multiRemove = function (keys) {
    return AsyncStorage.multiRemove(keys)
}

module.exports = Storage
