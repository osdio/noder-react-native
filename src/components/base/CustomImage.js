import React, {
	Component
} from 'react'
import {
	Image,
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class CustomImage extends Component {
  static propTypes = {
    defaultSize: PropTypes.object,
    maxImageWidth: PropTypes.number,
    uri: PropTypes.string
  };

  static defaultProps = {
    defaultSize: {
      height: 200,
      width: 200
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      size: props.defaultSize,
      isLoaded: false,
      error: false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this._loadImg(props.uri, props.maxImageWidth)
  }

  _loadImg (uri, maxImageWidth) {
    if (!uri) { return }
    const startTime = new Date().getTime()
    Image.getSize(uri, (w, h) => {
      if (w >= maxImageWidth) {
        h = (maxImageWidth / w) * h
        w = maxImageWidth
      }
      let leftTime = 500 - (new Date().getTime() - startTime)
      if (leftTime > 0) {
        setTimeout(() => {
          this.setState({
            size: {
              width: w,
              height: h
            },
            isLoaded: true
          })
        }, leftTime)
      }			else {
        this.setState({
          size: {
            width: w,
            height: h
          },
          isLoaded: true
        })
      }
    }, () => {
      this.setState({
        error: true
      })
    })
  }

  render () {
    const {uri, style} = this.props
    const {size, isLoaded, error} = this.state
    if (isLoaded) {
      return (
        <Image
          source={{uri}}
          style={[style, size]}
				/>
      )
    }

    if (error) {
      return (
        <TouchableOpacity onPress={() => this._loadImg(this.props.uri, this.props.maxImageWidth)}>
          <View style={[styles.container, size]}>
            <Icon
              name='ios-image-outline'
              size={60}
              style={styles.icon}
						/>
            <Text>
							点击重新加载图片
						</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={[styles.container, size]}>
        <Icon
          name='ios-image-outline'
          size={60}
          style={styles.icon}
				/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    margin: 10
  },
  icon: {
    color: 'rgba(0,0,0,0.5)'
  }
})
