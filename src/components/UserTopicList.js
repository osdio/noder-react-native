import React, {Component} from 'react'
import {View, StyleSheet, Text, ListView, Dimensions} from 'react-native'
import moment from 'moment'
import TopicRow from './TopicRow'

const { width } = Dimensions.get('window')

class UserTopicList extends Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.data = this.props.data || []
    this.state = {
      ds: this.ds.cloneWithRows(this.data)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data != this.props.data) {
      this.setState({
        ds: this.ds.cloneWithRows(nextProps.data)
      })
    }
  }

  _onRowPress (topic) {
    this.props.router.toTopic({
      topic: topic,
      id: topic.id
    })
  }

  _renderRowFooter (topic) {
    var date = moment(topic.last_reply_at).startOf('minute').fromNow()
    let dateItem = (
      <Text
        key='dateText'
        style={[styles['topicFooter text'], styles['topicFooter date']]}>
        {date}
      </Text>
		)

    let authorItem = (
      <Text
        key='authorText'
        style={[styles['topicFooter text'], styles['topicFooter author']]}>
        {topic.author.loginname}
      </Text>
		)

    return [dateItem, authorItem]
  }

  _renderRow (topic) {
    return (
      <TopicRow
        onPress={this._onRowPress.bind(this)}
        topic={topic}
        footer={this._renderRowFooter(topic)}
			/>
    )
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          showsVerticalScrollIndicator
          initialListSize={10}
          pagingEnabled={false}
          removeClippedSubviews
          dataSource={this.state.ds}
          renderRow={this._renderRow.bind(this)} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: width
  },
  'topicFooter text': {
    'fontSize': 11,
    'color': 'rgba(0, 0, 0, 0.3)'
  },
  'topicFooter date': {
    'position': 'absolute',
    'right': 0,
    'top': 0
  },
  'topicFooter author': {
    position: 'absolute',
    left: 0,
    top: 0
  }
})

export default UserTopicList
