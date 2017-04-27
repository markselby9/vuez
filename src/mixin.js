import * as _ from 'lodash';
import initHook from './api/initHook';

// Apply a mixin globally, which affects every Vue instance created afterwards.
export default function (Vue) {
		let version = _.toNumber(Vue.version);

		const _lifecycleHooks = Vue.config._lifecycleHooks;
		if (_lifecycleHooks) {
				if (version >= 2) {
						// vue 2.x
						if (_.indexOf(_lifecycleHooks, 'init') >= 0) {
								// use init hook
								Vue.mixin({
										init: initHook
								});
						} else {
								// use beforeCreate hook
								Vue.mixin({
										beforeCreate: initHook
								});
						}
				} else {
						// override init and inject vuex init procedure
						// for 1.x backwards compatibility.
				}
		}
}
