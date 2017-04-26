import * as _ from 'lodash';

export default function (Vue) {
		let version = _.toNumber(Vue.version);

		if (version >= 2) {
				// vue 2.x
		} else {
				// override init and inject vuex init procedure
				// for 1.x backwards compatibility.
		}
}
