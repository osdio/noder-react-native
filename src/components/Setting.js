import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from './base/Modal'
import Button from 'react-native-button'
import Row from './base/Row'

const {height, width} = Dimensions.get('window')
const iconSize = 17
const rowHeight = 50

class Setting extends Component {
  static propTypes = {
    router: PropTypes.object,
    actions: PropTypes.object
  };

  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  onAboutPress () {
    this.props.router.toAbout()
  }

  onLogoutPress () {
    this.props.router.pop()
    this.props.actions.logout()
  }

  onClearPress () {
    const {actions} = this.props
    actions.clear()
    actions.toast('缓存清除成功')
  }

  show () {
    this.setState({
      visible: true
    })
  }

  render () {
    if (!this.state.visible) { return null }
    return (
      <Modal blur blurStyle={styles.modalStyle} style={styles.container}>
        <View style={styles.body}>
          <View style={styles.contentWrapper}>
            <View style={[styles.row, styles.header]}>
              <Icon
                name='ios-gear'
                size={iconSize}
                color='rgba(255,255,255,0.5)'
                style={styles.Icon} />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.rowText}>
									设置
								</Text>
              </View>
            </View>

            <Row key='about' style={styles.row} onPress={this.onAboutPress.bind(this)}>
              <Icon
                name='ios-eye'
                size={iconSize}
                color='rgba(255,255,255,0.5)'
                style={styles.Icon} />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.rowText}>
									关于
								</Text>
              </View>
            </Row>

            <Row key='clean' style={styles.row} onPress={this.onClearPress.bind(this)}>
              <Icon
                name='ios-trash'
                size={iconSize}
                color='rgba(255,255,255,0.5)'
                style={styles.Icon} />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.rowText}>
									清除缓存
								</Text>
              </View>
            </Row>

            <Row key='power' style={styles.row} onPress={this.onLogoutPress.bind(this)}>
              <Icon
                name='power'
                size={iconSize}
                color='#E74C3C'
                style={styles.Icon} />
              <View style={styles.rowTextWrapper}>
                <Text style={[styles.rowText, styles.logoutText]}>
									退出
								</Text>
              </View>
            </Row>
          </View>

          <Row style={styles.closeButton} onPress={() => this.setState({ visible: false })}>
            <Icon
              name='ios-close-outline'
              size={30}
              color='rgba(255,255,255,0.9)'
              style={styles.closeIcon} />
          </Row>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentWrapper: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.3)' : '#292829',
    borderRadius: 3,
    margin: 30
  },
  body: {
    flex: 1,
    height: rowHeight * 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 2,
    paddingLeft: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: width - 30 * 2
  },
  rowText: {
    color: 'rgba(255,255,255,0.7)'
  },
  rowTextWrapper: {
    paddingLeft: 20
  },
  logoutText: {
    color: '#E74C3C'
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  closeIcon: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    borderColor: 'rgba(255,255,255,0.2)',
    textAlign: 'center'
  }
})

export default Setting
