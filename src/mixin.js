import toNumber from 'lodash/toNumber';
import indexOf from 'lodash/indexOf';

// Apply a mixin globally, which affects every Vue instance created afterwards.
export default function (Vue) {
		let version = toNumber(Vue.version.split('.')[0]);

		const _lifecycleHooks = Vue.config._lifecycleHooks;
		if (_lifecycleHooks) {
				if (version >= 2) {
						// vue 2.x
						if (indexOf(_lifecycleHooks, 'init') >= 0) {
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
						// for 1.x backwards compatibility.
				}
		}
}

function initHook () {
		const options = this.$options;
		// store injection
		if (options.store) {
				this.$store = options.store;
		} else if (options.parent && options.parent.$store) {
				// use parent Vue component's $store
				this.$store = options.parent.$store;
		}
}

