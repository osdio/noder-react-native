export function parseImgUrl(url) {
	if (/^\/\/.*/.test(url)) {
		url = 'http:' + url
	}
	return url
}
