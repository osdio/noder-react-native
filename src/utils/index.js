import React from 'react'
import {Linking} from 'react-native'

const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
  '#16A085', '#2ECC71', '#27AE60', '#3498DB',
  '#2980B9', '#9B59B6', '#8E44AD', '#34495E',
  '#2C3E50', '#E67E22',
  '#D35400', '#7F8C8D']

function getRandomNum (Min, Max) {
  const Range = Max - Min
  const Rand = Math.random()
  return (Min + Math.round(Rand * Range))
}

export function parseImgUrl (url) {
  if (/^\/\/.*/.test(url)) {
    url = 'http:' + url
  }
  return url
}

export function genColor () {
  return colors[getRandomNum(0, colors.length - 1)]
}

export function link (url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      return Linking.openURL(url)
    }
  })
		.catch(err => {
  console.error('An error occurred', err)
})
}
