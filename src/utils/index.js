import React,{
	Linking
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
	Linking.canOpenURL(url).then(supported=> {
			if (supported) {
				return Linking.openURL(url)
			}
		})
		.catch(err=> {
			console.error('An error occurred', err);
		})
}

export function substring(str, start, end) {
	let result = '';
	let i = 0;
	while (i < end) {
		let c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			result += str[i];
		}
		else {
			end -= 1;
			result += str[i];
		}
		i++;
	}
	return result;
}


export function strlen(str) {
	let len = 0;
	for (let i = 0; i < str.length; i++) {
		const c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			len++;
		}
		else {
			len += 2;
		}
	}
	return len;
}
