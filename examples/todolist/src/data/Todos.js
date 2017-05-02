import {STORAGE_KEY} from './const';

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
		window.localStorage.clear()
}

export default ()=>(
		JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
);