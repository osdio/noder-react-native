import qs from 'query-string';
import config from '../configs';


const urlPrefix = config.domain + config.apiPath;


function filterJSON(res) {
	return res.json();
}


function filterStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return res
	}
	else {
		let error = new Error(res.statusText);
		error.res = res;
		error.type = 'http';
		throw error;
	}
}


export function get(url, params) {
	if (params) {
		url = `${urlPrefix + url}?${qs.stringify(params)}`;
	}

	return fetch(url)
		.then(filterStatus)
		.then(filterJSON);
}


export function post(url, body) {
	return fetch(urlPrefix + url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}


