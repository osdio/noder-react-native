var React = require('react-native')
var Dimensions = require('Dimensions')


var {
    AlertIOS,
    LinkingIOS
    } = React


// The Dimensions API may change, so I move to a single module
exports.get = function () {
    return Dimensions.get('window')
}


exports.alert = function (content) {
    AlertIOS.alert(content)
}


exports.link = function (url) {
    LinkingIOS.canOpenURL(url, (supported) => {
        if (!supported) {
            console.warn("Can't support the url")
        } else {
            LinkingIOS.openURL(url)
        }
    })
}


exports.parseImgUrl= function (url) {
    if (/^\/\/.*/.test(url)) {
        url = 'http:' + url
    }
    return url
}
