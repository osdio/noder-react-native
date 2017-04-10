import React, {Component} from 'react'
import {StyleSheet, Image, Dimensions} from 'react-native'
import Html from './base/Html'

const {width} = Dimensions.get('window')

class CommentHtml extends Component {
  constructor (props) {
    super(props)
    if (this.props.style) {
      this.styles = Object.assign({}, styles, this.props.style)
    }
  }

  render () {
    return (
      <Html
        content={this.props.content}
        style={this.styles}
        router={this.props.router}
        maxImageWidth={width - 80 - 20}
      />
    )
  }
}

const fontSize = 14
const titleMargin = 5

const styles = StyleSheet.create({
  p: {
    // lineHeight: fontSize * 1.4,
    fontSize: fontSize,
    color: 'rgba(0,0,0,0.8)'
  },
  pwrapper: {
    marginTop: 5,
    marginBottom: 5
  },

  a: {
    color: '#3498DB',
    fontSize: fontSize,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 10,
    marginLeft: 10
  },
  h1: {
    fontSize: fontSize * 1.6,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  },
  h1wrapper: {
    marginTop: titleMargin,
    marginBottom: titleMargin
  },
  h2: {
    fontSize: fontSize * 1.5,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.85)'
  },
  h2wrapper: {
    marginBottom: titleMargin,
    marginTop: titleMargin
  },
  h3: {
    fontWeight: 'bold',
    fontSize: fontSize * 1.4,
    color: 'rgba(0,0,0,0.8)'
  },
  h3wrapper: {
    marginBottom: titleMargin - 2,
    marginTop: titleMargin - 2
  },
  h4: {
    fontSize: fontSize * 1.3,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h4wrapper: {
    marginBottom: titleMargin - 2,
    marginTop: titleMargin - 2
  },
  h5: {
    fontSize: fontSize * 1.2,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h5wrapper: {
    marginBottom: titleMargin - 3,
    marginTop: titleMargin - 3
  },
  h6: {
    fontSize: fontSize * 1.1,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h6wrapper: {
    marginBottom: titleMargin - 3,
    marginTop: titleMargin - 3
  },
  li: {
    fontSize: fontSize * 0.9,
    color: 'rgba(0,0,0,0.7)'
  },
  liwrapper: {
    paddingLeft: 20,
    marginBottom: 10
  },
  strong: {
    fontWeight: 'bold'
  },
  em: {
    fontStyle: 'italic'
  },
  codeScrollView: {
    backgroundColor: '#333',
    flexDirection: 'column',
    marginBottom: 15
  },
  codeRow: {
    flex: 1,
    flexDirection: 'row',
    height: 25,
    alignItems: 'center'
  },
  codeFirstRow: {
    paddingTop: 20,
    height: 25 + 20
  },
  codeLastRow: {
    paddingBottom: 20,
    height: 25 + 20
  },
  codeFirstAndLastRow: {
    paddingBottom: 20,
    height: 25 + 40,
    paddingTop: 20
  },
  lineNum: {
    width: 55,
    color: 'rgba(255,255,255,0.5)'
  },
  lineNumWrapper: {
    width: 55,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  codeWrapper: {
    flexDirection: 'column'
  },
  codeLineWrapper: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  blockquotewrapper: {
    paddingLeft: 20,
    borderLeftColor: '#3498DB',
    borderLeftWidth: 3
  },
  img: {
    width: width - 80 - 20,
    height: width - 80 - 20,
    resizeMode: Image.resizeMode.contain,
    margin: 10
  }
})

export default CommentHtml
