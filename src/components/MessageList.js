import React, {Component} from 'react'
import {View, StyleSheet, Text, Image, ListView, TouchableHighlight, Dimensions, RefreshControl} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import {parseImgUrl} from '../utils'
import * as Constants from '../constants'

const {height, width} = Dimensions.get('window')

class MessageList extends Component {
  static propTypes = {
    data: PropTypes.array,
    pending: PropTypes.bool,
    getMessageList: PropTypes.func,
    didFocus: PropTypes.bool
  };

  static defaultProps = {
    pending: false,
    didFocus: false,
    data: []
  };

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      ds: this.ds.cloneWithRows(props.data)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.data)
      })
    }
  }

  _onRowPress (message) {
    this.props.router.toComment({
      topic: message.topic,
      from: 'message',
      reply: message.reply,
      id: message.topic.id
    })
  }

  _renderRowFooter (message) {
    const date = moment(message.reply.create_at).startOf('minute').fromNow()

    return (
      <View style={styles.topicFooter}>
        <Text style={styles['topicFooter text']}>
          <Text>
            {message.author.loginname}
          </Text>
          <Text style={styles[message.type + 'Text']}>
            {message.type == 'reply' ? ' 回复' : ' @'}
          </Text>
        </Text>

        <Text style={[styles['topicFooter date'], styles['topicFooter text']]}>
          {date}
        </Text>
      </View>
    )
  }

  _renderRow (message) {
    var topic = message.topic

    return (
      <TouchableHighlight
        onPress={() => { this._onRowPress(message) }}
        underlayColor='#3498DB'
        key={message.id}>
        <View style={styles.row}>
          <Image
            style={styles.img}
            source={{uri: parseImgUrl(message.author.avatar_url)}}
					/>

          <View style={styles.topic}>
            <Text numberOfLines={1} style={[styles.title]}>
              {topic.title}
            </Text>

            <View style={[styles.topicFooter]}>
              {this._renderRowFooter(message)}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderHeader () {
    const {data, didFocus} = this.props
    if (!data.length && didFocus) {
      return (
        <View style={styles.emptyMessage}>
          <Text style={styles.emptyMessageText}>
						空空哒
					</Text>
        </View>
      )
    }
    return null
  }

  render () {
    const {pending, didFocus, getMessageList} = this.props
    return (
      <ListView
        enableEmptySections
        showsVerticalScrollIndicator
        initialListSize={10}
        pagingEnabled={false}
        removeClippedSubviews
        dataSource={this.state.ds}
        renderRow={this._renderRow.bind(this)}
        renderHeader={this._renderHeader.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={pending || !didFocus}
            onRefresh={() => { getMessageList() }}
            {...Constants.refreshControl}
						  />
					}
			/>
    )
  }
}

const styles = StyleSheet.create({
  'row': {
    'height': 90,
    'flexDirection': 'row',
    'borderBottomColor': 'rgba(0, 0, 0, 0.02)',
    'borderBottomWidth': 1,
    'paddingTop': 25,
    'paddingRight': 20,
    'paddingBottom': 25,
    'paddingLeft': 20,
    alignItems: 'center'
  },
  'img': {
    'height': 40,
    'width': 40,
    'borderRadius': 20,
    marginRight: 20
  },
  'topic': {
    flexDirection: 'column',
    width: width - 20 * 3 - 40
  },
  'title': {
    'fontSize': 15
  },
  'topicFooter': {
    'marginTop': 10,
    'flexDirection': 'row',
    width: width - (20 + 90)
  },
  'topicFooter text': {
    'fontSize': 11,
    'color': 'rgba(0, 0, 0, 0.4)'
  },
  'topicFooter date': {
    'position': 'absolute',
    'right': 0,
    'top': 0
  },
  'topicFooter count': {
    'marginRight': 15
  },
  'topicFooter top': {
    'fontSize': 11,
    'marginTop': 1,
    'marginRight': 0,
    'marginBottom': 0,
    'marginLeft': 10,
    'color': '#E74C3C'
  },
  'topicFooter good': {
    'fontSize': 11,
    'marginTop': 1,
    'marginRight': 0,
    'marginBottom': 0,
    'marginLeft': 10,
    'color': '#2ECC71'
  },
  'topicFooter tab': {
    'fontSize': 11,
    'marginTop': 1,
    'marginRight': 0,
    'marginBottom': 0,
    'marginLeft': 10
  },
  'loading': {
    'marginTop': 250
  },
  rowFooterText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)'
  },
  atText: {
    color: '#E74C3C'
  },
  replyText: {
    color: '#2980B9'
  },
  emptyMessage: {
    marginTop: 80,
    flex: 1
  },
  emptyMessageText: {
    textAlign: 'center',
    color: '#3498DB',
    fontSize: 24
  }

})

export default MessageList
