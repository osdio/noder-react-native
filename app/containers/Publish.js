var React = require('react-native')
var { Icon } = require('react-native-icons')
var Modal = require('react-native-modal')
var precomputeStyle = require('precomputeStyle')
var KeyboardEvents = require('react-native-keyboardevents')
var KeyboardEventEmitter = KeyboardEvents.Emitter

var Nav = require('../components/Nav')
var Loading = require('../components/overlay/Loading')

var TopicService = require('../services/TopicService')

var window = require('../util/window')
var { width, height } = window.get()
var config = require('../configs/config')


var {
    Component,
    View,
    Text,
    StyleSheet,
    PickerIOS,
    TouchableOpacity,
    TextInput,
    ScrollView
    } = React


var PickerItemIOS = PickerIOS.Item


class Publish extends Component {
    constructor(props) {
        super(props)
        this.tabs = {
            ask: '问答',
            share: '分享',
            job: '招聘'
        }
        this.state = {
            selectTab: 'share',
            isPickerShow: false,
            dirty: false,
            isPublishing: false
        }
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
    }


    updateKeyboardSpace(frames) {
        this.contentInput.setNativeProps({
            height: contentHeight - frames.end.height
        })
    }

    resetKeyboardSpace() {
        this.contentInput.setNativeProps({
            height: contentHeight
        })
    }


    componentDidMount() {
        KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace)
        KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace)
    }

    componentWillUnmount() {
        KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace)
        KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace)
    }


    _blur() {
        this.titleInput.blur()
        this.contentInput.blur()
    }


    _validateForm() {
        if (!this.state.dirty) {
            return window.alert('请选择要发布的板块!')
        }


        if (!this.titleInputValue || this.titleInput == '') {
            return window.alert('标题不能为空!')
        }

        if (!this.contentInputValue || this.contentInput == '') {
            return window.alert('你还没写东西呢!')
        }

        if (this.titleInputValue.length <= 10) {
            return window.alert('标题字数必须在10字以上!')
        }

        return true
    }


    _submit() {
        if (this.state.isPublishing || !this._validateForm()) return

        this.setState({
            isPublishing: true
        })
        TopicService.req.publish(this.titleInputValue, this.state.selectTab, this.contentInputValue, this.props.state.user.token)
            .then(topicId=> {
                this.props.router.replaceWithTopic({
                    topicId: topicId,
                    from: 'html'
                })
            })
            .catch(err=> {
                console.log(err)
                window.alert('发布帖子失败!')
            })
            .done(()=> {
                this.setState({
                    isPublishing: false
                })
            })
    }


    _onPickerPress() {
        this.setState({
            isPickerShow: true,
            dirty: true
        })
        this._blur()
    }


    _onPickerValueChange(tab) {
        this.setState({
            selectTab: tab
        })
    }


    _closeModal() {
        this.setState({
            isPickerShow: false
        })
    }


    _renderPickerContent() {
        return Object.keys(this.tabs).map(tab=> {
            return (
                <PickerItemIOS
                    key={tab}
                    value={tab}
                    label={this.tabs[tab]}
                    ></PickerItemIOS>
            )
        })
    }


    render() {
        var router = this.props.router

        var navs = {
            Left: {
                text: '返回',
                onPress: ()=> {
                    router.pop()
                    this._blur()
                }
            },
            Center: {
                text: '发表帖子'
            },
            Right: {
                text: '发布',
                onPress: ()=> this._submit()
            }
        }


        return (
            <View style={styles.container}>
                <Nav
                    navs={navs}
                    ></Nav>

                <ScrollView
                    ref={view=>this.contentView=view}
                    style={styles.content}>
                    <TouchableOpacity
                        onPress={this._onPickerPress.bind(this)}
                        >
                        <View style={styles.row}>
                            <Icon
                                name={'ion|ios-keypad'}
                                size={24}
                                color='#1ABC9C'
                                style={[styles.selectorIcon, styles.labelIcon]}
                                />

                            <Text style={styles.tabSelectorText}>
                                {this.state.dirty ? this.tabs[this.state.selectTab] : '请选择板块'}
                            </Text>

                            <Icon
                                name={'ion|ios-arrow-right'}
                                size={24}
                                color='rgba(0,0,0,0.35)'
                                style={styles.selectorIcon}
                                />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Icon
                            name={'ion|ios-bolt'}
                            size={24}
                            color='#1ABC9C'
                            style={[styles.selectorIcon, styles.labelIcon]}
                            />

                        <TextInput
                            ref={view=>this.titleInput=view}
                            placeholder='请输入标题'
                            style={styles.titleInput}
                            onChangeText={(text) => {
                                this.titleInputValue = text
                            }}
                            />
                    </View>


                    <TextInput
                        ref={view=>this.contentInput=view}
                        value={'\n'+config.replySuffix}
                        style={styles.topicContent}
                        multiline={true}
                        onChangeText={(text) => {
                            this.contentInputValue = text
                        }}
                        />

                </ScrollView>


                <Modal
                    style={modalStyles}
                    onPressBackdrop={this._closeModal.bind(this)}
                    hideCloseButton={true}
                    isVisible={this.state.isPickerShow}
                    onClose={() => this._closeModal()}>

                    <View style={styles.pickerIOS}>
                        <PickerIOS
                            selectedValue={this.state.selectTab}
                            onValueChange={this._onPickerValueChange.bind(this)}
                            >

                            {this._renderPickerContent()}

                        </PickerIOS>
                    </View>

                </Modal>

                <Loading
                    isVisible={this.state.isPublishing}
                    ></Loading>

            </View>
        )
    }
}


var textColor = 'rgba(0,0,0,0.7)'
var contentHeight = height - 51 * 2 - Nav.navHeight

var styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: 'white'
    },
    row: {
        height: 51,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(0,0,0,0.03)',
        borderBottomWidth: 1
    },
    selectorIcon: {
        height: 20,
        width: 20
    },
    labelIcon: {
        marginRight: 15
    },
    tabSelectorText: {
        flex: 1,
        color: textColor
    },
    titleInput: {
        height: 50,
        flex: 1,
        color: textColor,
        fontSize: 14
    },
    content: {
        paddingRight: 15,
        paddingLeft: 15
    },
    topicContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 20,
        height: contentHeight
    }
})


var modalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.07,
    },
    modal: {
        backgroundColor: 'white',

    }
})


module.exports = Publish


