var React = require('react-native');

var AsyncStorage = React.AsyncStorage;

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

module.exports = Storage