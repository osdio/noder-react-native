var React = require('react-native');

var styles = require('../styles/coverImage');

var window = require('../util/window');
var { width, height } = window.get()

var {
    StyleSheet,
    View,
    Component,
    Image
    } = React;


var extendStyles = StyleSheet.create({
    image: {
        width: width,
        height: height,
        resizeMode: Image.resizeMode.cover
    },
    wrapper: {
        width: width,
        height: height
    }
});


class CoverImage extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Image style={[styles.image,extendStyles.image]} source={this.props.image}>
                    {this.props.children}
                </Image>
            </View>
        )
    }
}

module.exports = CoverImage;