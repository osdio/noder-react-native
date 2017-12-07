import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import config from '../configs'
import * as utils from '../utils'

const {height, width} = Dimensions.get('window')

class About extends Component {
  _onSourceInGithubPress () {
    utils.link(config.sourceInGithub)
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.noderLogo}
          source={require('../images/noderIcon.png')}
				/>
        <Text style={styles.title}>Noder
					<Text style={{fontSize: 18, color: 'rgba(255,255,255,0.6)'}}>
  {' v' + config.package.version}
					</Text>
        </Text>

        <TouchableOpacity onPress={() => utils.link(config.cnodeAbout)}>
          <Text style={styles.subTitle}>For CNodejs.org</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onSourceInGithubPress.bind(this)}>
          <Icon
            name='ios-social-github'
            size={40}
            color='rgba(255,204,0,1)'
            style={[styles.rowIcon, {marginTop: 20}]} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.props.router.toUser({
            userName: config.author.cnodeName
          })}>
            <Text style={styles.subTitle}>@soliury</Text>
          </TouchableOpacity>

          <View style={[styles.row]}>
            <TouchableOpacity onPress={() => utils.link(config.author.blog)}>
              <Image
                style={styles.blog}
                source={require('../images/blog.png')} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => utils.link(config.RNWebPage)}>
            <Text style={styles.reactNative}>Power By
							React-Native {'v' + config.package.dependencies['react-native']}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    paddingTop: 30,
    backgroundColor: '#292829'
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    color: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'

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
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100
  },
  blog: {
    height: 20,
    width: 100,
    opacity: 0.5
  },
  reactNative: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.3)'
  }
})

export const LayoutComponent = About
export function mapStateToProps (state) {
  return {}
}
