import React,{
	LinkingIOS
} from 'react-native';


const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
	'#16A085', '#2ECC71', '#27AE60', '#3498DB',
	'#2980B9', '#9B59B6', '#8E44AD', '#34495E',
	'#2C3E50', '#E67E22',
	'#D35400', '#7F8C8D'];


function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}


export function parseImgUrl(url) {
	if (/^\/\/.*/.test(url)) {
		url = 'http:' + url
	}
	return url
}


export function genColor() {
	return colors[getRandomNum(0, colors.length - 1)];
}


export function link(url) {
	LinkingIOS.canOpenURL(url, (supported) => {
		if (!supported) {
			console.warn("Can't support the url")
		} else {
			LinkingIOS.openURL(url)
		}
	});
}
