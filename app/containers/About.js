var React = require('react-native')
var BlurView = require('react-native-blur').BlurView
var { Icon } = require('react-native-icons')


var config = require('../configs/config')
var window = require('../util/window')
var { width, height } = window.get()


var {
    View,
    Component,
    PropTypes,
    Text,
    StyleSheet,
    Image,
    ActivityIndicatorIOS,
    TouchableOpacity
    } = React

class Home extends Component {
    constructor(props) {
        super(props)
    }


    _onSourceInGithubPress() {
        window.link(config.sourceInGithub)
    }


    render() {
        return (
            <Image
                style={styles.bgWall}
                source={{uri:config.bgImgUri}}
                >
                <BlurView
                    blurType="dark"
                    style={styles.container}>


                    <Image
                        style={styles.noderLogo}
                        source={require('image!logo')}
                        />


                    <Text style={styles.title}>Noder
                        <Text style={{fontSize:18,color:'rgba(255,255,255,0.6)'}}>
                            {' v' + config.package.version}
                        </Text>
                    </Text>

                    <TouchableOpacity onPress={() => window.link(config.cnodeAbout)}>
                        <Text style={styles.subTitle}>For CNodejs.org</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onSourceInGithubPress.bind(this)}>
                        <Icon
                            name='ion|social-github'
                            size={40}
                            color='rgba(255,204,0,1)'
                            style={[styles.rowIcon,{marginTop:20}]}/>
                    </TouchableOpacity>


                    <Icon
                        name='ion|ios-arrow-thin-down'
                        size={60}
                        color='rgba(255,255,255,0.5)'
                        style={styles.arrow}/>


                    <View style={styles.footer}>

                        <TouchableOpacity onPress={() => this.props.router.toUser({
                        userName:config.author.cnodeName
                    })}>
                            <Text style={styles.subTitle}>@soliury</Text>
                        </TouchableOpacity>

                        <View style={[styles.row]}>
                            <TouchableOpacity onPress={()=> window.link(config.author.blog)}>
                                <Image
                                    style={styles.blog}
                                    source={require('image!blog')}
                                    ></Image>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => window.link(config.RNWebPage)}>
                            <Text style={styles.reactNative}>Power By
                                React-Native {'v' + config.package.dependencies['react-native']}</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </Image>
        )
    }
}

Home.propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object
}

var styles = StyleSheet.create({
    bgWall: {
        height: height,
        width: width
    },
    noderLogo: {
        height: 150,
        width: 150
    },
    container: {
        width: width,
        height: height,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 30
    },
    title: {
        marginTop: 20,
        fontSize: 30,
        color: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',

    },
    subTitle: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255,255,255,0.5)'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        alignItems: 'center'
    },
    rowIcon: {
        height: 40,
        width: 40
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        marginTop: 40,
        height: 50,
        width: 50
    },
    blog: {
        height: 20,
        width: 100,
        opacity: 0.5
    },
    reactNative: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.3)',
        marginBottom: 10
    }
})

module.exports = Home
