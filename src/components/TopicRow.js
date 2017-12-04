import React, {Component, PropTypes} from 'react'
import {View, StyleSheet, Text, Image, TouchableHighlight, Dimensions} from 'react-native'
import { parseImgUrl } from '../utils'

const { width } = Dimensions.get('window')

class TopicRow extends Component {
  static propTypes = {
    topic: PropTypes.object,
    footer: PropTypes.node,
    onPress: PropTypes.func
  };

  static defaultProps = {
    onPress: () => null
  };

  render () {
    const { topic } = this.props

    return (
      <TouchableHighlight
        onPress={() => { this.props.onPress(topic) }}
        underlayColor='#3498DB'
        key={topic.id}>

        <View style={styles.row}>
          <View style={styles.imgWrapper}>
            <Image
              ref={view => this.imgView = view}
              style={styles.img}
              source={{uri: parseImgUrl(topic.author.avatar_url) }} />
          </View>

          <View style={[styles.topic]}>
            <Text
              ref={view => this.titleText = view}
              numberOfLines={1}
              style={[styles.title]}>
              { topic.title }
            </Text>

            <View style={[styles.topicFooter]}>
              { this.props.footer }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

var styles = StyleSheet.create({
  'row': {
    'height': 90,
    'flexDirection': 'row',
    'borderBottomColor': 'rgba(0, 0, 0, 0.02)',
    'borderBottomWidth': 1,
    'paddingTop': 25,
    'paddingRight': 0,
    'paddingBottom': 25,
    'paddingLeft': 20
  },
  'imgWrapper': {
    'width': 90,
    'position': 'absolute',
    'left': 20,
    'top': 25,
    'height': 65
  },
  'img': {
    'height': 40,
    'width': 40,
    'borderRadius': 20
  },
  'topic': {
    'marginLeft': 60,
    width: width - 100
  },
  'title': {
    'fontSize': 15
  },
  'topicFooter': {
    'marginTop': 12,
    'flexDirection': 'row'
  }
})

export default TopicRow
